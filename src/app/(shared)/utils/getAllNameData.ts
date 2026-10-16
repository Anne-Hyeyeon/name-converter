import "server-only";
import { unstable_cache } from "next/cache";
import { getSheetsClient } from "../../../../lib/google-sheets-api";
import { snakeToCamel } from "./snakeToCamel";
import { NameData } from "../types";

const SPREADSHEET_RANGE = "names!A:O";
const NUMERIC_FIELDS = ["characteristic", "feelingNum", "births"];
const BOOLEAN_FIELDS = [
  "femaleTop",
  "maleTop",
  "trendyFemaleTop",
  "trendyMaleTop",
  "doggyName",
];

type RawRow = string[];
type Row = Record<string, string | number | boolean>;

const toNumber = (v: string): number | string => {
  if (!v) return v;
  const n = parseInt(v);
  return Number.isNaN(n) ? v : n;
};

const toBoolean = (v: string): boolean =>
  v === "TRUE" || v === "true" || v === "1";

const processRow = (row: RawRow, headers: string[]): Row => {
  const obj = headers.reduce<Row>((acc, h, i) => {
    acc[h] = row[i] || "";
    return acc;
  }, {});
  for (const f of NUMERIC_FIELDS) {
    if (obj[f]) obj[f] = toNumber(obj[f] as string);
  }
  for (const f of BOOLEAN_FIELDS) {
    if (obj[f]) obj[f] = toBoolean(obj[f] as string);
  }
  return obj;
};

async function fetchAllNames(): Promise<NameData[]> {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing SPREADSHEET_ID environment variable");
  }

  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: SPREADSHEET_RANGE,
  });

  const rows = (response.data.values || []) as RawRow[];
  if (rows.length === 0) return [];

  const headers = rows[0].map((h) =>
    snakeToCamel(h.toLowerCase().replace(/\s+/g, "_"))
  );

  const seen = new Set<string>();
  return (rows.slice(1).map((r) => processRow(r, headers)) as unknown as NameData[])
    .filter((data) => {
      if (!data.name || seen.has(data.name)) return false;
      seen.add(data.name);
      return true;
    });
}

const getAllNameData = unstable_cache(fetchAllNames, ["all-name-data"], {
  revalidate: 3600,
  tags: ["names"],
});

export default getAllNameData;
