import "server-only";
import type { NameData } from "@/app/(shared)/types";
import { getSheetTab } from "@/app/(shared)/utils/getSheetTab";
import { getKoreanCelebrityData } from "./koreanCelebrities";
import { getKoreanYearData } from "./koreanYearNames";

const INDEXED_ENGLISH_NAMES = 500;

let englishBuilt: { rows: unknown; names: Set<string> } | null = null;

export const getIndexedEnglishNames = async (
  allNameData: NameData[]
): Promise<Set<string>> => {
  const rows = await getSheetTab("us_name_trends");
  if (englishBuilt?.rows !== rows) {
    const known = new Set(allNameData.map((data) => data.name));
    englishBuilt = {
      rows,
      names: new Set(
        rows
          .filter((row) => known.has(row.name))
          .sort((a, b) => Number(b.total) - Number(a.total))
          .slice(0, INDEXED_ENGLISH_NAMES)
          .map((row) => row.name)
      ),
    };
  }
  return englishBuilt.names;
};

export const getIndexedKoreanNames = async (): Promise<Set<string>> => {
  const years = await getKoreanYearData();
  const celebrityData = await getKoreanCelebrityData();
  return new Set([
    ...years.rankedNames(),
    ...celebrityData
      .givenNames()
      .filter((name) =>
        celebrityData.get(name)?.people.some((person) => person.group)
      ),
  ]);
};
