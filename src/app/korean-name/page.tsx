import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName } from "@/app/(shared)/utils/findName";
import { getDictionary } from "./i18n";
import KoreanNameSearch, { type NameExample } from "./components/KoreanNameSearch";
import { KOREAN_NAME_URLS } from "./constants";
import { getGenerationByCharacteristic, toGender } from "./utils/generation";
import { romanizeName } from "./utils/romanize";

export const revalidate = 3600;

export const metadata = {
  alternates: { canonical: KOREAN_NAME_URLS.HOME },
};

const t = getDictionary();
const EXAMPLE_NAMES = ["Anne", "Jennifer", "Olivia"];

export default async function KoreanNameHome() {
  const allNameData = await getAllNameData();
  const names = allNameData
    .map((data) => data.name)
    .sort((a, b) => a.localeCompare(b));

  const examples = EXAMPLE_NAMES.flatMap((name): NameExample[] => {
    const data = findName(allNameData, name);
    const generation = data
      ? getGenerationByCharacteristic(Number(data.characteristic))
      : null;
    if (!data?.koreanName || !generation) return [];
    const generationText = t.generations[generation];
    return [
      {
        name: data.name,
        koreanName: data.koreanName,
        romanized: romanizeName(data.koreanName),
        label: `${generationText.label} ${t.result.labelSuffix} ${generationText.emoji}`,
      },
    ];
  });

  return <KoreanNameSearch names={names} examples={examples} />;
}
