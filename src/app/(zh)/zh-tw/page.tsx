import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName } from "@/app/(shared)/utils/findName";
import ZhNameSearch, { type ZhExample } from "./components/ZhNameSearch";
import { ZH_URLS } from "./constants";
import { matchTaiwanName } from "./utils/twNames";
import { isTaiwanMatchable } from "./utils/match";

export const revalidate = 3600;

export const metadata = {
  alternates: {
    canonical: ZH_URLS.HOME,
    languages: { ko: "/", "zh-Hant-TW": ZH_URLS.HOME },
  },
};

const EXAMPLE_NAMES = ["Jennifer", "Kevin", "Linda", "Olivia"];

export default async function ZhHome() {
  const allNameData = await getAllNameData();
  const names = allNameData.map((data) => data.name).sort((a, b) => a.localeCompare(b));

  const examples: ZhExample[] = [];
  for (const name of EXAMPLE_NAMES) {
    const data = findName(allNameData, name);
    if (!data || !isTaiwanMatchable(data)) continue;
    const match = await matchTaiwanName(data.name, data.trendYear, data.gender === "M" ? "M" : "F");
    if (match) examples.push({ name: data.name, twName: match.name });
  }

  return <ZhNameSearch names={names} examples={examples} />;
}
