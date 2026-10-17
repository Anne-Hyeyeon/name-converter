import "server-only";
import { getSheetMeta, getSheetTab } from "./getSheetTab";

export type NameTrendData = {
  sex: "F" | "M";
  start: number;
  births: number[];
  peakYear: number;
  peakCount: number;
  bestRank: number;
  bestRankYear: number;
  latestRank: number | null;
  latestCount: number;
  total: number;
};

let indexed: { rows: unknown; names: Map<string, NameTrendData> } | null = null;

const loadTrends = async () => {
  const rows = await getSheetTab("us_name_trends");
  if (indexed?.rows === rows) return indexed.names;
  const names = new Map<string, NameTrendData>();
  for (const row of rows) {
    names.set(row.name, {
      sex: row.sex === "M" ? "M" : "F",
      start: Number(row.start),
      births: row.births.split(",").map(Number),
      peakYear: Number(row.peak_year),
      peakCount: Number(row.peak_count),
      bestRank: Number(row.best_rank),
      bestRankYear: Number(row.best_rank_year),
      latestRank: row.latest_rank ? Number(row.latest_rank) : null,
      latestCount: Number(row.latest_count),
      total: Number(row.total),
    });
  }
  indexed = { rows, names };
  return names;
};

export const getTrendLastYear = async (): Promise<number> =>
  Number(await getSheetMeta("us_trends_last_year"));

export const getNameTrend = async (name: string): Promise<NameTrendData | null> =>
  (await loadTrends()).get(name) ?? null;
