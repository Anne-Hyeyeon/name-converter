import { writeMeta, writeTab } from "./sheets.mjs";

const TREND_HEADERS = [
  "name", "sex", "start", "births", "peak_year", "peak_count", "best_rank",
  "best_rank_year", "latest_rank", "latest_count", "total",
];
const RANKING_HEADERS = ["year", "sex", "rank", "name", "count"];

/**
 * 이름별 연도별 출생아 수와 연도별 Top 50을 시트 탭에 씁니다.
 */
export const writeUsNameTabs = async ({ firstYear, lastYear, names, years }) => {
  await writeTab(
    "us_name_trends",
    TREND_HEADERS,
    Object.entries(names).map(([name, t]) => ({
      name,
      sex: t.sex,
      start: t.start,
      births: t.births.join(","),
      peak_year: t.peakYear,
      peak_count: t.peakCount,
      best_rank: t.bestRank,
      best_rank_year: t.bestRankYear,
      latest_rank: t.latestRank ?? "",
      latest_count: t.latestCount,
      total: t.total,
    }))
  );
  await writeTab(
    "us_year_rankings",
    RANKING_HEADERS,
    Object.entries(years).flatMap(([year, ranking]) =>
      ["F", "M"].flatMap((sex) =>
        ranking[sex].map(([name, count], i) => ({
          year,
          sex,
          rank: i + 1,
          name,
          count,
        }))
      )
    )
  );
  await writeMeta({
    us_trends_source: "U.S. Social Security Administration",
    us_trends_first_year: firstYear,
    us_trends_last_year: lastYear,
  });
};
