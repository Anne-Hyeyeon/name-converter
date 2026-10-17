import type { Metadata } from "next";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName, findSimilarNames } from "@/app/(shared)/utils/findName";
import pageStyles from "@/app/result/[name]/page.module.css";
import { getTop100 } from "@/app/(shared)/utils/getTop100";
import type { NameData } from "@/app/(shared)/types";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import KoreanNameResult, {
  type KoreanNameResultProps,
} from "../components/KoreanNameResult";
import KoreanNameNotFound from "../components/KoreanNameNotFound";
import { getGenerationByCharacteristic, toGender } from "../utils/generation";
import { romanizeName } from "../utils/romanize";
import {
  getKoreanYearData,
  type KoreanYearData,
} from "../utils/koreanYearNames";

export const revalidate = 3600;

const t = getDictionary();
const BIRTH_YEAR_FIRST = 1940;

const hasKoreanMatch = (data: NameData) =>
  !!data.koreanName && Number(data.characteristic) !== 10;

const toResultProps = (
  data: NameData,
  years: KoreanYearData
): KoreanNameResultProps => {
  const characteristic = Number(data.characteristic);
  const matched = hasKoreanMatch(data);
  const generation = matched ? getGenerationByCharacteristic(characteristic) : null;
  return {
    name: data.name,
    gender: toGender(data.gender),
    characteristic,
    koreanName: matched && generation ? data.koreanName : null,
    romanized: matched && generation ? romanizeName(data.koreanName) : null,
    generation,
    usTrendYear:
      characteristic >= 1 && characteristic <= 6 && data.trendYear
        ? data.trendYear
        : null,
    top3ByYear: years.top3ByYear(),
    birthYearRange: [BIRTH_YEAR_FIRST, years.lastYear],
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const data = findName(await getAllNameData(), name);

  if (!data) {
    const decoded = decodeURIComponent(name);
    return {
      title: t.meta.notFoundTitle(decoded),
      description: t.meta.notFoundDescription(decoded),
      robots: { index: false, follow: true },
    };
  }

  const props = toResultProps(data, await getKoreanYearData());
  const label = props.generation ? t.generations[props.generation].label : null;
  const title =
    props.koreanName && props.romanized
      ? t.meta.resultTitle(data.name, `${props.koreanName} (${props.romanized})`)
      : t.meta.notFoundTitle(data.name);
  const description =
    props.koreanName && label
      ? t.meta.resultDescription(data.name, props.koreanName, label)
      : t.meta.description;

  return {
    title,
    description,
    alternates: { canonical: KOREAN_NAME_URLS.result(data.name) },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: t.siteName,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function KoreanNameResultPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const allNameData = await getAllNameData();
  const data = findName(allNameData, name);

  return (
    <div className={pageStyles.pageContainer}>
      {data ? (
        <KoreanNameResult {...toResultProps(data, await getKoreanYearData())} />
      ) : (
        <KoreanNameNotFound
          query={decodeURIComponent(name)}
          suggestions={findSimilarNames(allNameData, name).map((n) => ({
            key: n,
            label: n,
          }))}
          hrefFor={KOREAN_NAME_URLS.result}
          backHref={KOREAN_NAME_URLS.HOME}
          backLabel={t.result.back}
        />
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return (await getTop100())
    .flatMap((entry) => [entry.boy, entry.girl])
    .concat("Anne")
    .map((name) => ({ name }));
}
