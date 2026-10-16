import "server-only";
import trends from "../data/name-trends.json";

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

const names = trends.names as Record<string, NameTrendData>;

export const TREND_LAST_YEAR = trends.lastYear;

export const getNameTrend = (name: string): NameTrendData | null =>
  names[name] ?? null;
