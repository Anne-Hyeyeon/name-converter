import "server-only";
import { getSheetTab } from "./getSheetTab";

type RankingEntry = [name: string, count: number];

export type YearRanking = {
  F: RankingEntry[];
  M: RankingEntry[];
};

let indexed: { rows: unknown; years: Map<number, YearRanking> } | null = null;

const loadRankings = async () => {
  const rows = await getSheetTab("us_year_rankings");
  if (indexed?.rows === rows) return indexed.years;
  const years = new Map<number, YearRanking>();
  for (const row of rows) {
    const year = Number(row.year);
    const ranking = years.get(year) ?? { F: [], M: [] };
    ranking[row.sex === "M" ? "M" : "F"][Number(row.rank) - 1] = [
      row.name,
      Number(row.count),
    ];
    years.set(year, ranking);
  }
  indexed = { rows, years };
  return years;
};

export const getRankingYears = async (): Promise<number[]> =>
  [...(await loadRankings()).keys()].sort((a, b) => a - b);

export const getRankingRange = async () => {
  const years = await getRankingYears();
  return { first: years[0], last: years[years.length - 1] };
};

export const getYearRanking = async (year: number): Promise<YearRanking | null> =>
  (await loadRankings()).get(year) ?? null;
