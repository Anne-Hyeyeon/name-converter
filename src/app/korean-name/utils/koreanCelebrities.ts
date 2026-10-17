import "server-only";
import { getSheetTab } from "@/app/(shared)/utils/getSheetTab";
import { romanizeFullName } from "./romanize";

const PER_NAME = 10;

export type KoreanCelebrity = {
  fullName: string;
  romanized: string;
  group: string | null;
  occupation: string | null;
  birthYear: number;
  gender: "M" | "F" | null;
};

export type KoreanCelebrities = {
  total: number;
  people: KoreanCelebrity[];
  medianBirthYear: number;
  gender: "M" | "F";
};

const createCelebrities = (rows: Awaited<ReturnType<typeof getSheetTab>>) => {
  const byName = new Map<string, { links: number; person: KoreanCelebrity }[]>();
  for (const row of rows) {
    const list = byName.get(row.given_name) ?? [];
    list.push({
      links: Number(row.links),
      person: {
        fullName: row.full_name,
        romanized: romanizeFullName(row.full_name, row.given_name),
        group: row.group || null,
        occupation: row.occupation || null,
        birthYear: Number(row.birth_year),
        gender: row.gender === "M" || row.gender === "F" ? row.gender : null,
      },
    });
    byName.set(row.given_name, list);
  }

  return {
    givenNames: (): string[] => [...byName.keys()],
    /**
     * 본명의 이름이 같은 가수, 배우를 유명한 순서로 돌려줍니다.
     */
    get: (givenName: string): KoreanCelebrities | null => {
      const list = byName.get(givenName);
      if (!list) return null;
      const people = [...list]
        .sort((a, b) => b.links - a.links)
        .slice(0, PER_NAME)
        .map((entry) => entry.person);
      const males = people.filter((p) => p.gender === "M").length;
      const females = people.filter((p) => p.gender === "F").length;
      const years = people.map((p) => p.birthYear).sort((a, b) => a - b);
      return {
        total: list.length,
        people,
        medianBirthYear: years[Math.floor(years.length / 2)],
        gender: males > females ? "M" : "F",
      };
    },
  };
};

export type KoreanCelebrityData = ReturnType<typeof createCelebrities>;

let built: { rows: unknown; data: KoreanCelebrityData } | null = null;

export const getKoreanCelebrityData = async (): Promise<KoreanCelebrityData> => {
  const rows = await getSheetTab("korean_celebrities");
  if (built?.rows !== rows) built = { rows, data: createCelebrities(rows) };
  return built.data;
};
