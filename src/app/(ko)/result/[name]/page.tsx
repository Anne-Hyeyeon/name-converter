import SearchResult from "@/app/(shared)/components/search/SearchResult";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import styles from "./page.module.css";
import NameNotFound from "@/app/(shared)/components/search/NameNotFound";
import type { Metadata } from "next";
import { findName, findSimilarNames } from "@/app/(shared)/utils/findName";
import {
  getNameTrend,
  getTrendLastYear,
} from "@/app/(shared)/utils/getNameTrend";
import { getTop100Names } from "@/app/(shared)/utils/getTop100";
import NameTrend from "@/app/(shared)/components/search/NameTrend";
import RelatedNames from "@/app/(shared)/components/seo/RelatedNames";
import JsonLd from "@/app/(shared)/components/seo/JsonLd";
import { getRelatedNames } from "@/app/(shared)/utils/getRelatedNames";
import { breadcrumbJsonLd } from "@/app/(shared)/utils/structuredData";
import type { NameData } from "@/app/(shared)/types";

const hasKoreanName = (data: NameData) =>
  !!data.koreanName && Number(data.characteristic) !== 10;

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const selectedNameData = findName(await getAllNameData(), name);

  const siteName = "내가 춘자라니";

  if (!selectedNameData) {
    return {
      title: `${name} - ${siteName}`,
      description: `${name}에 대한 결과를 찾을 수 없습니다.`,
      robots: { index: false, follow: true },
    };
  }

  const { name: englishName, koreanName, trendYear } = selectedNameData;
  const title = hasKoreanName(selectedNameData)
    ? `${englishName}, 미국에선 ${koreanName}? 영어 이름 느낌 - ${siteName}`
    : `${englishName} 영어 이름 느낌 - ${siteName}`;
  const description = hasKoreanName(selectedNameData)
    ? `${englishName}은 미국에서 ${koreanName} 같은 느낌의 이름이에요.${trendYear ? ` 주로 ${trendYear}년대에 유행했어요.` : ""} 영어 이름의 유행 연도, 세대, 연도별 출생아 수를 알아보세요.`
    : `${englishName}은 미국에서 어떤 이미지의 이름일까요? 이름의 트렌드와 특성을 알아보세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/result/${selectedNameData.name}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName,
      locale: "ko_KR",
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const allNameData = await getAllNameData();
  const selectedNameData = findName(allNameData, name);
  const trend = selectedNameData
    ? await getNameTrend(selectedNameData.name)
    : null;
  const lastYear = await getTrendLastYear();
  const isTop100 = selectedNameData
    ? (await getTop100Names()).has(selectedNameData.name)
    : false;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {selectedNameData ? (
          <>
            <JsonLd
              data={breadcrumbJsonLd([
                { name: "내가 춘자라니", path: "/" },
                {
                  name: selectedNameData.name,
                  path: `/result/${encodeURIComponent(selectedNameData.name)}`,
                },
              ])}
            />
            <SearchResult
              result={selectedNameData}
              isTop100={isTop100}
              trendChart={
                <>
                  {trend && (
                    <NameTrend
                      name={selectedNameData.name}
                      trend={trend}
                      lastYear={lastYear}
                      sheetTrendYear={selectedNameData.trendYear}
                    />
                  )}
                  <RelatedNames
                    title="같은 시기에 유행한 영어 이름"
                    names={getRelatedNames(allNameData, selectedNameData).map(
                      (data) => ({
                        href: `/result/${encodeURIComponent(data.name)}`,
                        label: data.name,
                        sub: hasKoreanName(data) ? data.koreanName : undefined,
                      })
                    )}
                  />
                </>
              }
            />
          </>
        ) : (
          <NameNotFound
            name={name}
            similarNames={findSimilarNames(allNameData, name)}
          />
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const allNameData = await getAllNameData();

  return allNameData.map((data) => ({
    name: data.name,
  }));
}
