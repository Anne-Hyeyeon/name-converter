import "server-only";
import {
  getSheetsClient,
  withSheetsRetry,
} from "../../../../lib/google-sheets-api";

const TTL_MS = 60 * 60 * 1000;

const DATA_TABS = [
  "data_meta",
  "us_name_trends",
  "us_year_rankings",
  "us_top100_2025",
  "korean_year_names",
  "korean_name_stats",
  "korean_celebrities",
  "tw_decade_names",
] as const;

export type SheetTab = (typeof DATA_TABS)[number];

export type SheetRow = Record<string, string>;

let cache: { at: number; tabs: Promise<Map<string, SheetRow[]>> } | null = null;

const toRows = (values: string[][] | null | undefined): SheetRow[] => {
  const [headers = [], ...rows] = values ?? [];
  return rows.map((row) =>
    Object.fromEntries(headers.map((header, i) => [header, row[i] ?? ""]))
  );
};

const fetchAllTabs = async (): Promise<Map<string, SheetRow[]>> => {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing SPREADSHEET_ID environment variable");
  }
  const response = await withSheetsRetry(() =>
    getSheetsClient().spreadsheets.values.batchGet({
      spreadsheetId,
      ranges: DATA_TABS.map((tab) => `${tab}!A:Z`),
    })
  );
  return new Map(
    DATA_TABS.map((tab, i) => [
      tab,
      toRows(response.data.valueRanges?.[i]?.values as string[][] | undefined),
    ])
  );
};

/**
 * 데이터 탭을 한 번의 요청으로 모두 읽어 서버 메모리에 1시간 둡니다.
 */
export const getSheetTab = async (tab: SheetTab): Promise<SheetRow[]> => {
  if (!cache || Date.now() - cache.at >= TTL_MS) {
    const tabs = fetchAllTabs();
    cache = { at: Date.now(), tabs };
    tabs.catch(() => {
      cache = null;
    });
  }
  return (await cache.tabs).get(tab) ?? [];
};

/**
 * data_meta 탭의 값을 읽습니다.
 */
export const getSheetMeta = async (key: string): Promise<string> => {
  const row = (await getSheetTab("data_meta")).find((r) => r.key === key);
  if (!row) throw new Error(`data_meta 에 ${key} 가 없습니다.`);
  return row.value;
};
