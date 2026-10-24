import "server-only";
import { getSheetTab } from "@/app/(shared)/utils/getSheetTab";

let built: { rows: unknown; spellings: Map<string, string> } | null = null;

const loadSpellings = async () => {
  const rows = await getSheetTab("english_name_hangul");
  if (built?.rows !== rows) {
    built = {
      rows,
      spellings: new Map(
        rows.filter((row) => row.hangul).map((row) => [row.name, row.hangul])
      ),
    };
  }
  return built.spellings;
};

export const getHangulSpelling = async (name: string): Promise<string | null> =>
  (await loadSpellings()).get(name) ?? null;
