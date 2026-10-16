import type { MetadataRoute } from "next";
import getAllNameData from "./(shared)/utils/getAllNameData";
import { URLS } from "./(shared)/constants/urls";
import { getRankingYears } from "./(shared)/utils/getYearRanking";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nameData = await getAllNameData();

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
    ...getRankingYears().map((year) => ({
      url: `${URLS.SITE}${URLS.YEAR_PAGE}/${year}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...nameData.map((data) => ({
      url: `${URLS.SITE}/result/${encodeURIComponent(data.name)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
