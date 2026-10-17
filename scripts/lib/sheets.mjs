import { google } from "googleapis";

const PROTECTED_TABS = new Set(["names"]);
const CHUNK_ROWS = 5000;

const getSheets = () => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString()
  );
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
};

const spreadsheetId = () => {
  if (!process.env.SPREADSHEET_ID) throw new Error("SPREADSHEET_ID 가 없습니다.");
  return process.env.SPREADSHEET_ID;
};

const tabTitles = async (sheets) => {
  const { data } = await sheets.spreadsheets.get({
    spreadsheetId: spreadsheetId(),
    fields: "sheets.properties.title",
  });
  return new Set(data.sheets.map((sheet) => sheet.properties.title));
};

/**
 * 탭을 헤더 이름을 키로 한 행 목록으로 읽습니다. 탭이 없으면 빈 배열입니다.
 */
export const readTab = async (tab) => {
  const sheets = getSheets();
  if (!(await tabTitles(sheets)).has(tab)) return [];
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId(),
    range: `${tab}!A:Z`,
  });
  const [headers = [], ...rows] = data.values ?? [];
  return rows.map((row) =>
    Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ""]))
  );
};

/**
 * 탭 내용을 통째로 바꿉니다. 탭이 없으면 만듭니다. names 탭은 쓰지 않습니다.
 */
export const writeTab = async (tab, headers, rows) => {
  if (PROTECTED_TABS.has(tab)) throw new Error(`${tab} 탭에는 쓰지 않습니다.`);
  const sheets = getSheets();
  if (!(await tabTitles(sheets)).has(tab)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId(),
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: tab,
                gridProperties: { rowCount: rows.length + 1, columnCount: headers.length },
              },
            },
          },
        ],
      },
    });
  } else {
    const { data } = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId(),
      fields: "sheets.properties",
    });
    const sheet = data.sheets.find((s) => s.properties.title === tab);
    const grid = sheet.properties.gridProperties;
    if (grid.rowCount < rows.length + 1 || grid.columnCount < headers.length) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId(),
        requestBody: {
          requests: [
            {
              updateSheetProperties: {
                properties: {
                  sheetId: sheet.properties.sheetId,
                  gridProperties: {
                    rowCount: Math.max(grid.rowCount, rows.length + 1),
                    columnCount: Math.max(grid.columnCount, headers.length),
                  },
                },
                fields: "gridProperties(rowCount,columnCount)",
              },
            },
          ],
        },
      });
    }
  }
  await sheets.spreadsheets.values.clear({
    spreadsheetId: spreadsheetId(),
    range: `${tab}!A:Z`,
  });
  const values = [headers, ...rows.map((row) => headers.map((h) => row[h] ?? ""))];
  for (let start = 0; start < values.length; start += CHUNK_ROWS) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId(),
      range: `${tab}!A${start + 1}`,
      valueInputOption: "RAW",
      requestBody: { values: values.slice(start, start + CHUNK_ROWS) },
    });
  }
  console.log(`${tab} 탭에 ${rows.length}행을 썼습니다.`);
};

/**
 * data_meta 탭에서 주어진 키만 바꾸고 나머지는 그대로 둡니다.
 */
export const writeMeta = async (entries) => {
  const current = Object.fromEntries(
    (await readTab("data_meta")).map((row) => [row.key, row.value])
  );
  const merged = { ...current, ...entries };
  await writeTab(
    "data_meta",
    ["key", "value"],
    Object.entries(merged).map(([key, value]) => ({ key, value: String(value) }))
  );
};
