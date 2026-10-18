import type { Metadata } from "next";
import Link from "next/link";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { findName, findSimilarNames } from "@/app/(shared)/utils/findName";
import { getNameTrend, getTrendLastYear } from "@/app/(shared)/utils/getNameTrend";
import { getTop100, getTop100Names } from "@/app/(shared)/utils/getTop100";
import { getRelatedNames } from "@/app/(shared)/utils/getRelatedNames";
import { getEmoji } from "@/app/(shared)/utils";
import { breadcrumbJsonLd } from "@/app/(shared)/utils/structuredData";
import NameTrend from "@/app/(shared)/components/search/NameTrend";
import RelatedNames from "@/app/(shared)/components/seo/RelatedNames";
import JsonLd from "@/app/(shared)/components/seo/JsonLd";
import resultStyles from "@/app/(shared)/components/search/SearchResult.module.css";
import notFoundStyles from "@/app/(shared)/components/search/NameNotFound.module.css";
import pageStyles from "@/app/(ko)/result/[name]/page.module.css";
import type { NameData } from "@/app/(shared)/types";
import { zh, zhTrendText } from "../../i18n";
import { ZH_URLS } from "../../constants";
import { matchTaiwanName, type TwMatch } from "../../utils/twNames";
import { isTaiwanMatchable } from "../../utils/match";
import ZhShareButtons from "../../components/ZhShareButtons";
import styles from "../../zh.module.css";

export const revalidate = 3600;

const genderOf = (data: NameData) => (data.gender === "M" ? "M" : "F");

const loadMatch = async (data: NameData): Promise<TwMatch | null> =>
  isTaiwanMatchable(data)
    ? matchTaiwanName(data.name, data.trendYear, genderOf(data))
    : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const data = findName(await getAllNameData(), name);
  if (!data) {
    return {
      title: zh.meta.notFoundTitle(decodeURIComponent(name)),
      robots: { index: false, follow: true },
    };
  }
  const match = await loadMatch(data);
  const title = match
    ? zh.meta.resultTitle(data.name, match.name)
    : zh.meta.plainTitle(data.name);
  const description = match
    ? zh.meta.resultDescription(data.name, data.trendYear, match.name)
    : zh.meta.description;
  return {
    title,
    description,
    alternates: {
      canonical: ZH_URLS.result(data.name),
      languages: {
        ko: `/result/${encodeURIComponent(data.name)}`,
        "zh-Hant-TW": ZH_URLS.result(data.name),
      },
    },
    openGraph: { title, description, type: "website", siteName: zh.siteName, locale: "zh_TW" },
  };
}

export default async function ZhResultPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const allNameData = await getAllNameData();
  const data = findName(allNameData, name);

  if (!data) {
    const similar = findSimilarNames(allNameData, name);
    return (
      <div className={pageStyles.pageContainer}>
        <div className={notFoundStyles.resultPage}>
          <h1 className={notFoundStyles.name}>{decodeURIComponent(name)}</h1>
          <p className={notFoundStyles.infoText}>
            {zh.landing.notListed(decodeURIComponent(name))}
          </p>
          {similar.length > 0 && (
            <RelatedNames
              title="你要找的是不是"
              names={similar.map((n) => ({ href: ZH_URLS.result(n), label: n }))}
            />
          )}
          <Link href={ZH_URLS.HOME} className={styles.textAction}>
            {zh.result.back}
          </Link>
        </div>
      </div>
    );
  }

  const match = await loadMatch(data);
  const gender = genderOf(data);
  const characteristic = Number(data.characteristic);
  const generation = zh.generations[characteristic];
  const trend = await getNameTrend(data.name);
  const lastYear = await getTrendLastYear();
  const isTop100 = (await getTop100Names()).has(data.name);
  const related = getRelatedNames(allNameData, data).filter(isTaiwanMatchable);

  return (
    <div className={pageStyles.pageContainer}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: zh.siteName, path: ZH_URLS.HOME },
          { name: data.name, path: ZH_URLS.result(data.name) },
        ])}
      />
      <div className={resultStyles.resultPage}>
        <h1 className={resultStyles.name}>{data.name}</h1>
        <div className={resultStyles.emojiContainer}>
          <span role="img" aria-label="character" className={resultStyles.largeEmoji}>
            {getEmoji(data.gender, characteristic)}
          </span>
        </div>
        <div className={resultStyles.mainContent}>
          {match ? (
            <>
              <p className={resultStyles.infoText}>{zh.result.lead(data.name)}</p>
              <p className={resultStyles.infoText}>
                <strong>{zh.result.era(data.trendYear)}</strong>
              </p>
              <p className={resultStyles.infoText}>{zh.result.likeTaiwan}</p>
              <div className={styles.twCard}>
                <span className={styles.twName}>{match.name}</span>
                <p className={styles.twNote}>{zh.result.twNote(match.from, match.to, gender)}</p>
              </div>
            </>
          ) : (
            <div className={resultStyles.messageContainer}>
              {(generation ? [] : zh.result.noMatch).map((line) => (
                <p key={line} className={resultStyles.infoText}>
                  {line}
                </p>
              ))}
            </div>
          )}
          {generation && (
            <>
              <p className={styles.badge}>
                {generation.label} {generation.emoji}
              </p>
              <div className={`${resultStyles.messageContainer} ${styles.lines}`}>
                {generation.lines.map((line) => (
                  <p key={line} className={resultStyles.infoText}>
                    {line}
                  </p>
                ))}
              </div>
            </>
          )}
          {data.name === "Anne" && (
            <p className={resultStyles.developerNote}>{zh.result.developerNote}</p>
          )}
        </div>
        <div className={resultStyles.additionalInfo}>
          {isTop100 && <p className={resultStyles.highlight}>{zh.result.top100(data.name)}</p>}
          {data.doggyName && <p className={resultStyles.highlight}>{zh.result.doggy(data.name)}</p>}
        </div>
      </div>
      {match && (
        <RelatedNames
          title={zh.result.sameEraTitle(match.from, match.to)}
          names={match.sameEra.map((n) => ({ label: n }))}
        />
      )}
      {trend && (
        <NameTrend
          name={data.name}
          trend={trend}
          lastYear={lastYear}
          sheetTrendYear={data.trendYear}
          text={zhTrendText}
        />
      )}
      <RelatedNames
        title={zh.result.relatedTitle}
        names={related.map((r) => ({ href: ZH_URLS.result(r.name), label: r.name }))}
      />
      <div className={styles.actions}>
        <ZhShareButtons
          name={data.name}
          shareText={match ? zh.result.shareText(data.name, match.name) : null}
        />
        <Link href={ZH_URLS.HOME} className={styles.textAction}>
          {zh.result.back}
        </Link>
      </div>
      <p className={styles.source}>{zh.result.source}</p>
    </div>
  );
}

export async function generateStaticParams() {
  return (await getTop100())
    .flatMap((entry) => [entry.boy, entry.girl])
    .concat("Anne", "Jennifer")
    .map((name) => ({ name }));
}
