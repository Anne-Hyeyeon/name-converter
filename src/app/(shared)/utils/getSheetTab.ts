import "server-only";
import { getSheetsClient } from "../../../../lib/google-sheets-api";

const TTL_MS = 60 * 60 * 1000;

export type SheetRow = Record<string, string>;

const cache = new Map<string, { at: number; rows: Promise<SheetRow[]> }>();

const fetchTab = async (tab: string): Promise<SheetRow[]> => {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing SPREADSHEET_ID environment variable");
  }
  const response = await getSheetsClient().spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A:Z`,
  });
  const [headers = [], ...rows] = (response.data.values ?? []) as string[][];
  return rows.map((row) =>
    Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ""]))
  );
};

/**
 * 시트 탭을 헤더 이름을 키로 한 행 목록으로 읽습니다. 서버 메모리에 1시간 둡니다.
 */
export const getSheetTab = (tab: string): Promise<SheetRow[]> => {
  const hit = cache.get(tab);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.rows;
  const rows = fetchTab(tab);
  cache.set(tab, { at: Date.now(), rows });
  rows.catch(() => cache.delete(tab));
  return rows;
};

/**
 * data_meta 탭의 값을 읽습니다.
 */
export const getSheetMeta = async (key: string): Promise<string> => {
  const row = (await getSheetTab("data_meta")).find((r) => r.key === key);
  if (!row) throw new Error(`data_meta 에 ${key} 가 없습니다.`);
  return row.value;
};
