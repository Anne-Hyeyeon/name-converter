import "server-only";
import { getSheetMeta, getSheetTab } from "@/app/(shared)/utils/getSheetTab";
import type { Gender } from "../i18n";

export type KoreanNameTrend = {
  firstYear: number;
  counts: number[];
  peakYear: number;
  peakCount: number;
  total: number;
  gender: Gender;
};

const createStats = (
  rows: Awaited<ReturnType<typeof getSheetTab>>,
  firstYear: number
) => {
  const names = new Map<string, KoreanNameTrend>();
  for (const row of rows) {
    const counts = row.by_year.split(",").map(Number);
    const peakCount = Math.max(...counts);
    names.set(row.name, {
      firstYear,
      counts,
      peakYear: firstYear + counts.indexOf(peakCount),
      peakCount,
      total: counts.reduce((sum, count) => sum + count, 0),
      gender: Number(row.male) > Number(row.female) ? "M" : "F",
    });
  }
  return {
    names: (minPeakCount = 0): string[] =>
      [...names.entries()]
        .filter(([, trend]) => trend.peakCount >= minPeakCount)
        .map(([name]) => name),
    /**
     * 2008년 이후 연도별 출생아 수(하한 추정치)를 그래프용으로 돌려줍니다.
     */
    trend: (koreanName: string): KoreanNameTrend | null =>
      names.get(koreanName) ?? null,
  };
};

export type KoreanNameStats = ReturnType<typeof createStats>;

let built: { rows: unknown; stats: KoreanNameStats } | null = null;

export const getKoreanNameStats = async (): Promise<KoreanNameStats> => {
  const rows = await getSheetTab("korean_name_stats");
  if (built?.rows !== rows) {
    const firstYear = Number(await getSheetMeta("korean_stats_first_year"));
    built = { rows, stats: createStats(rows, firstYear) };
  }
  return built.stats;
};
