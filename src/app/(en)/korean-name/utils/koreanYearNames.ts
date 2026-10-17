import "server-only";
import { getSheetTab } from "@/app/(shared)/utils/getSheetTab";
import type { Gender } from "../i18n";

const TOP_SIZE = 10;

export type KoreanNameEntry = [name: string, count: number | null];

export type KoreanYearNames = {
  year: number;
  source: string;
  sourceUrl: string;
  official: boolean;
  note?: string;
  M: KoreanNameEntry[];
  F: KoreanNameEntry[];
};

export type KoreanNameAppearance = {
  year: number;
  gender: Gender;
  rank: number;
  count: number | null;
};

const buildYears = (
  rows: Awaited<ReturnType<typeof getSheetTab>>
): KoreanYearNames[] => {
  const years = new Map<number, KoreanYearNames>();
  for (const row of rows) {
    const year = Number(row.year);
    const rank = Number(row.rank);
    const entry = years.get(year) ?? {
      year,
      source: row.source_en,
      sourceUrl: row.source_url,
      official: row.source_url.includes("scourt.go.kr"),
      note: row.note,
      M: [],
      F: [],
    };
    years.set(year, entry);
    if (rank > TOP_SIZE) continue;
    entry[row.gender === "M" ? "M" : "F"][rank - 1] = [
      row.name_ko,
      row.count ? Number(row.count) : null,
    ];
  }
  return [...years.values()].sort((a, b) => a.year - b.year);
};

const closest = (dataYears: number[], year: number) =>
  dataYears.reduce((best, candidate) =>
    Math.abs(candidate - year) < Math.abs(best - year) ? candidate : best
  );

const createKoreanYearData = (years: KoreanYearNames[]) => {
  const dataYears = years.map((entry) => entry.year);
  return {
    dataYears,
    firstYear: dataYears[0],
    lastYear: dataYears[dataYears.length - 1],
    get: (year: number) => years.find((entry) => entry.year === year) ?? null,
    /**
     * 데이터가 있는 연도 중 태어난 해와 가장 가까운 연도를 고릅니다. 거리가 같으면 앞 연도입니다.
     */
    closest: (year: number) => closest(dataYears, year),
    adjacent: (year: number) => {
      const index = dataYears.indexOf(year);
      return {
        prev: index > 0 ? dataYears[index - 1] : null,
        next:
          index >= 0 && index < dataYears.length - 1
            ? dataYears[index + 1]
            : null,
      };
    },
    /**
     * 연도별 1~3위 이름만 뽑아 브라우저로 보냅니다.
     */
    top3ByYear: (): Record<number, Record<Gender, string[]>> =>
      Object.fromEntries(
        years.map((entry) => [
          entry.year,
          {
            F: entry.F.slice(0, 3).map(([name]) => name),
            M: entry.M.slice(0, 3).map(([name]) => name),
          },
        ])
      ),
    /**
     * 한글 이름이 연도별 상위 이름에 들었던 기록을 모읍니다.
     */
    appearances: (koreanName: string): KoreanNameAppearance[] =>
      years.flatMap((entry) =>
        (["F", "M"] as const).flatMap((gender) => {
          const index = entry[gender].findIndex(([name]) => name === koreanName);
          return index < 0
            ? []
            : [
                {
                  year: entry.year,
                  gender,
                  rank: index + 1,
                  count: entry[gender][index][1],
                },
              ];
        })
      ),
    rankedNames: (): string[] =>
      Array.from(
        new Set(
          years.flatMap((entry) =>
            [...entry.F, ...entry.M].map(([name]) => name)
          )
        )
      ),
  };
};

export type KoreanYearData = ReturnType<typeof createKoreanYearData>;

let built: { rows: unknown; data: KoreanYearData } | null = null;

export const getKoreanYearData = async (): Promise<KoreanYearData> => {
  const rows = await getSheetTab("korean_year_names");
  if (built?.rows !== rows) {
    built = { rows, data: createKoreanYearData(buildYears(rows)) };
  }
  return built.data;
};
