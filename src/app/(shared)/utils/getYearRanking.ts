import "server-only";
import rankings from "../data/year-rankings.json";

type RankingEntry = [name: string, count: number];

export type YearRanking = {
  F: RankingEntry[];
  M: RankingEntry[];
};

const years = rankings.years as unknown as Record<string, YearRanking>;

export const RANKING_FIRST_YEAR = rankings.firstYear;
export const RANKING_LAST_YEAR = rankings.lastYear;

export const getRankingYears = (): number[] =>
  Array.from(
    { length: RANKING_LAST_YEAR - RANKING_FIRST_YEAR + 1 },
    (_, i) => RANKING_FIRST_YEAR + i
  );

export const getYearRanking = (year: number): YearRanking | null =>
  years[String(year)] ?? null;
