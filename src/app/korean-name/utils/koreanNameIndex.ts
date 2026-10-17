import "server-only";
import type { NameData } from "@/app/(shared)/types";
import type { Gender, GenerationKey } from "../i18n";
import {
  getGenerationByCharacteristic,
  getGenerationByYear,
  toGender,
} from "./generation";
import {
  getKoreanYearData,
  type KoreanNameAppearance,
  type KoreanYearData,
} from "./koreanYearNames";
import {
  getKoreanCelebrityData,
  type KoreanCelebrities,
  type KoreanCelebrityData,
} from "./koreanCelebrities";
import {
  getKoreanNameStats,
  type KoreanNameStats,
  type KoreanNameTrend,
} from "./koreanNameStats";
import {
  isHangul,
  normalizeRomanized,
  romanizeName,
  romanizeSlug,
} from "./romanize";

export type KoreanNameInfo = {
  koreanName: string;
  slug: string;
  romanized: string;
  appearances: KoreanNameAppearance[];
  englishNames: string[];
  generation: GenerationKey | null;
  gender: Gender;
  peak: KoreanNameAppearance | null;
  peakBornYear: number | null;
  trend: KoreanNameTrend | null;
  celebrities: KoreanCelebrities | null;
  generationFromCelebrities: boolean;
};

const POPULAR_PEAK_COUNT = 300;

const mostCommon = <T,>(values: T[]): T | undefined => {
  const counts = new Map<T, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
};

const hasKoreanMatch = (data: NameData) =>
  !!data.koreanName && Number(data.characteristic) !== 10;

type Datasets = {
  years: KoreanYearData;
  stats: KoreanNameStats;
  celebrityData: KoreanCelebrityData;
};

const buildInfo = (
  koreanName: string,
  sheetRows: NameData[],
  { years, stats, celebrityData }: Datasets
): KoreanNameInfo => {
  const appearances = years.appearances(koreanName);
  const peak =
    [...appearances].sort((a, b) => a.rank - b.rank || a.year - b.year)[0] ??
    null;
  const sheetGeneration = mostCommon(
    sheetRows
      .map((row) => getGenerationByCharacteristic(Number(row.characteristic)))
      .filter((g): g is GenerationKey => g !== null)
  );
  const trend = stats.trend(koreanName);
  const celebrities = celebrityData.get(koreanName);
  const gender = peak
    ? mostCommon(appearances.map((a) => a.gender)) ?? peak.gender
    : sheetRows.length > 0
      ? toGender(mostCommon(sheetRows.map((row) => row.gender)))
      : trend?.gender ?? celebrities?.gender ?? "F";
  const trendGeneration =
    trend && trend.peakCount >= POPULAR_PEAK_COUNT
      ? getGenerationByYear(trend.peakYear)
      : null;
  const dataGeneration = peak
    ? getGenerationByYear(peak.year)
    : sheetGeneration ?? trendGeneration;
  const celebrityGeneration =
    !dataGeneration && celebrities
      ? getGenerationByYear(celebrities.medianBirthYear)
      : null;

  return {
    koreanName,
    slug: romanizeSlug(koreanName),
    romanized: romanizeName(koreanName),
    appearances,
    englishNames: sheetRows.map((row) => row.name).slice(0, 8),
    generation: dataGeneration ?? celebrityGeneration,
    gender,
    peak,
    peakBornYear: trend ? years.closest(trend.peakYear) : null,
    trend,
    celebrities,
    generationFromCelebrities: !!celebrityGeneration,
  };
};

/**
 * 연도별 상위 이름과 시트의 한국 이름을 합쳐 로마자로 찾을 수 있게 묶습니다.
 */
export const buildKoreanNameIndex = async (allNameData: NameData[]) => {
  const datasets: Datasets = {
    years: await getKoreanYearData(),
    stats: await getKoreanNameStats(),
    celebrityData: await getKoreanCelebrityData(),
  };
  const sheetRowsByName = new Map<string, NameData[]>();
  for (const row of allNameData.filter(hasKoreanMatch)) {
    const rows = sheetRowsByName.get(row.koreanName) ?? [];
    rows.push(row);
    sheetRowsByName.set(row.koreanName, rows);
  }

  const koreanNames = new Set([
    ...datasets.years.rankedNames(),
    ...sheetRowsByName.keys(),
    ...datasets.stats.names(),
    ...datasets.celebrityData.givenNames(),
  ]);

  const bySlug = new Map<string, KoreanNameInfo[]>();
  for (const koreanName of koreanNames) {
    if (!isHangul(koreanName)) continue;
    const info = buildInfo(
      koreanName,
      sheetRowsByName.get(koreanName) ?? [],
      datasets
    );
    const key = normalizeRomanized(info.slug);
    bySlug.set(key, [...(bySlug.get(key) ?? []), info]);
  }
  return bySlug;
};

export type KoreanNameIndex = Awaited<ReturnType<typeof buildKoreanNameIndex>>;

export const findKoreanNames = (
  index: KoreanNameIndex,
  query: string
): KoreanNameInfo[] => {
  const trimmed = decodeURIComponent(query).trim();
  const key = normalizeRomanized(
    isHangul(trimmed) ? romanizeSlug(trimmed) : trimmed
  );
  const matches = index.get(key) ?? [];
  return isHangul(trimmed)
    ? matches.filter((info) => info.koreanName === trimmed)
    : matches;
};
