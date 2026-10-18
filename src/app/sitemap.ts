import type { MetadataRoute } from "next";
import getAllNameData from "./(shared)/utils/getAllNameData";
import { URLS } from "./(shared)/constants/urls";
import { getRankingYears } from "./(shared)/utils/getYearRanking";
import { KOREAN_NAME_URLS } from "./(en)/korean-name/constants";
import { getKoreanYearData } from "./(en)/korean-name/utils/koreanYearNames";
import { romanizeSlug } from "./(en)/korean-name/utils/romanize";
import { getKoreanNameStats } from "./(en)/korean-name/utils/koreanNameStats";
import { getKoreanCelebrityData } from "./(en)/korean-name/utils/koreanCelebrities";
import { ZH_URLS } from "./(zh)/zh-tw/constants";
import { isTaiwanMatchable } from "./(zh)/zh-tw/utils/match";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nameData = await getAllNameData();
  const rankingYears = await getRankingYears();
  const koreanYears = await getKoreanYearData();
  const koreanStats = await getKoreanNameStats();
  const celebrityData = await getKoreanCelebrityData();

  return [
    { url: URLS.SITE, changeFrequency: "weekly", priority: 1 },
    {
      url: `${URLS.SITE}${URLS.ENGLISH_NAME_PAGE}`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${URLS.SITE}${URLS.TOP100_2025_PAGE}`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${URLS.SITE}${URLS.YEAR_PAGE}`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...rankingYears.map((year) => ({
      url: `${URLS.SITE}${URLS.YEAR_PAGE}/${year}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...nameData.map((data) => ({
      url: `${URLS.SITE}/result/${encodeURIComponent(data.name)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${URLS.SITE}${ZH_URLS.HOME}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...nameData.filter(isTaiwanMatchable).map((data) => ({
      url: `${URLS.SITE}${ZH_URLS.result(data.name)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${URLS.SITE}${KOREAN_NAME_URLS.HOME}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${URLS.SITE}${KOREAN_NAME_URLS.BORN}`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${URLS.SITE}${KOREAN_NAME_URLS.CHECK}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...koreanYears.dataYears.map((year) => ({
      url: `${URLS.SITE}${KOREAN_NAME_URLS.born(year)}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...[
      ...new Set(
        [
          ...koreanYears.rankedNames(),
          ...koreanStats.names(50),
          ...celebrityData.givenNames(),
        ].map(romanizeSlug)
      ),
    ].map((slug) => ({
      url: `${URLS.SITE}${KOREAN_NAME_URLS.check(slug)}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...nameData
      .filter((data) => data.koreanName && Number(data.characteristic) !== 10)
      .map((data) => ({
        url: `${URLS.SITE}${KOREAN_NAME_URLS.result(data.name)}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
