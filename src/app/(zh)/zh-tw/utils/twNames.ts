import "server-only";
import { getSheetTab } from "@/app/(shared)/utils/getSheetTab";

export type TwGender = "F" | "M";

const FIRST_RELIABLE_DECADE = 1921;

export type TwDecade = {
  from: number;
  to: number;
  gender: TwGender;
  names: { name: string; count: number }[];
};

let built: { rows: unknown; decades: TwDecade[] } | null = null;

const loadDecades = async (): Promise<TwDecade[]> => {
  const rows = await getSheetTab("tw_decade_names");
  if (built?.rows === rows) return built.decades;
  const byKey = new Map<string, TwDecade>();
  for (const row of rows) {
    const gender: TwGender = row.gender === "M" ? "M" : "F";
    const key = `${row.decade_from}-${gender}`;
    const decade = byKey.get(key) ?? {
      from: Number(row.decade_from),
      to: Number(row.decade_to),
      gender,
      names: [],
    };
    decade.names[Number(row.rank) - 1] = { name: row.name, count: Number(row.count) };
    byKey.set(key, decade);
  }
  const decades = [...byKey.values()].sort((a, b) => a.from - b.from);
  built = { rows, decades };
  return decades;
};

const hash = (text: string) =>
  [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);

const middleYear = (trendYear: string): number | null => {
  const years = trendYear.match(/\d{4}/g)?.map(Number);
  if (!years?.length) return null;
  return Math.round((years[0] + years[years.length - 1]) / 2);
};

export type TwMatch = {
  name: string;
  from: number;
  to: number;
  sameEra: string[];
};

/**
 * 영어 이름의 미국 유행 연대와 같은 시대에 대만에서 흔했던 이름을 고릅니다.
 */
export const matchTaiwanName = async (
  englishName: string,
  trendYear: string,
  gender: TwGender
): Promise<TwMatch | null> => {
  const year = middleYear(trendYear);
  if (!year) return null;
  const decades = (await loadDecades()).filter(
    (d) => d.gender === gender && d.from >= FIRST_RELIABLE_DECADE
  );
  const decade =
    decades.find((d) => d.from <= year && year <= d.to) ??
    (year < decades[0]?.from ? decades[0] : decades[decades.length - 1]);
  if (!decade) return null;
  const top3 = decade.names.slice(0, 3).map((n) => n.name);
  return {
    name: top3[hash(englishName) % top3.length],
    from: decade.from,
    to: decade.to,
    sameEra: decade.names.slice(0, 6).map((n) => n.name),
  };
};
