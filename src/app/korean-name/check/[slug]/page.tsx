import type { Metadata } from "next";
import Link from "next/link";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import { editDistance } from "@/app/(shared)/utils/findName";
import styles from "@/app/(shared)/components/search/SearchResult.module.css";
import pageStyles from "@/app/result/[name]/page.module.css";
import { getDictionary } from "../../i18n";
import { KOREAN_NAME_URLS } from "../../constants";
import HearButton from "../../components/HearButton";
import KoreanNameNotFound from "../../components/KoreanNameNotFound";
import KoreanNameCheckForm from "../../components/KoreanNameCheckForm";
import KoreanNameTrendChart from "../../components/KoreanNameTrendChart";
import KoreanNameCelebrities from "../../components/KoreanNameCelebrities";
import {
  buildKoreanNameIndex,
  findKoreanNames,
  type KoreanNameIndex,
  type KoreanNameInfo,
} from "../../utils/koreanNameIndex";
import { normalizeRomanized } from "../../utils/romanize";
import localStyles from "../../korean-name.module.css";

export const revalidate = 3600;

const t = getDictionary();

const loadIndex = async () => buildKoreanNameIndex(await getAllNameData());

const suggest = (index: KoreanNameIndex, query: string) => {
  const target = normalizeRomanized(decodeURIComponent(query));
  if (target.length < 2) return [];
  return [...index.entries()]
    .map(([key, infos]) => ({ infos, distance: editDistance(target, key) }))
    .filter((item) => item.distance > 0 && item.distance <= 2)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map((item) => item.infos[0]);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [info] = findKoreanNames(await loadIndex(), slug);
  if (!info) {
    return {
      title: t.meta.notFoundTitle(decodeURIComponent(slug)),
      robots: { index: false, follow: true },
    };
  }
  const title = t.meta.checkTitle(info.koreanName, info.romanized);
  const description = t.meta.checkDescription(info.romanized);
  const isThin =
    !info.peak &&
    !info.generation &&
    info.englishNames.length === 0 &&
    !info.celebrities &&
    (info.trend?.peakCount ?? 0) < 50;
  return {
    title,
    description,
    ...(isThin && { robots: { index: false, follow: true } }),
    alternates: { canonical: KOREAN_NAME_URLS.check(info.slug) },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: t.siteName,
      locale: "en_US",
    },
  };
}

const KoreanNameCheckResult = ({ info }: { info: KoreanNameInfo }) => {
  const generation = info.generation ? t.generations[info.generation] : null;
  const label = generation?.label;

  return (
    <div className={styles.resultPage}>
      <h1 className={styles.name}>{info.romanized}</h1>
      <div className={localStyles.nameCard}>
        <span lang="ko" className={localStyles.hangul}>
          {info.koreanName}
        </span>
        <HearButton hangul={info.koreanName} />
      </div>
      {generation && label && (
        <div className={styles.mainContent}>
          <p className={localStyles.generationBadge}>
            {label} {t.result.labelSuffix} {generation.emoji}
          </p>
          <div className={styles.messageContainer}>
            {generation.lines.map((line) => (
              <p key={line} className={styles.infoText}>
                {line}
              </p>
            ))}
            {info.generationFromCelebrities && (
              <p className={styles.developerNote}>{t.celebrities.basedOn}</p>
            )}
          </div>
        </div>
      )}
      {!generation && (
        <div className={styles.mainContent}>
          <p className={styles.infoText}>{t.trend.olderUnknown}</p>
        </div>
      )}
      {info.trend && (
        <KoreanNameTrendChart
          romanized={info.romanized}
          trend={info.trend}
          peakBornYear={info.peakBornYear ?? info.trend.peakYear}
        />
      )}
      {info.celebrities && (
        <KoreanNameCelebrities
          romanized={info.romanized}
          celebrities={info.celebrities}
        />
      )}
      <div className={styles.additionalInfo}>
        {info.peak && (
          <p className={styles.highlight}>
            {t.check.peakRank(
              info.peak.year,
              info.peak.rank,
              info.peak.gender === "F" ? t.check.girls : t.check.boys
            )}
          </p>
        )}
        {info.appearances.length > 0 && (
          <div className={styles.highlight}>
            <strong>{t.check.seenIn}</strong>
            <ul className={localStyles.appearances}>
              {info.appearances.map((a) => (
                <li key={`${a.year}-${a.gender}`}>
                  <Link
                    href={KOREAN_NAME_URLS.born(a.year)}
                    className={localStyles.appearance}
                  >
                    {a.year} · {a.gender === "F" ? t.born.girl : t.born.boy} #
                    {a.rank}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {info.englishNames.length > 0 && (
          <p className={styles.highlight}>
            {t.check.fromSheet}
            <span className={localStyles.englishNames}>
              {" "}
              {info.englishNames.map((name, index) => (
                <span key={name}>
                  {index > 0 && ", "}
                  <Link href={KOREAN_NAME_URLS.result(name)}>{name}</Link>
                </span>
              ))}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default async function KoreanNameCheckSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = await loadIndex();
  const matches = findKoreanNames(index, slug);

  if (matches.length === 0) {
    return (
      <div className={pageStyles.pageContainer}>
        <KoreanNameNotFound
          query={decodeURIComponent(slug)}
          suggestions={suggest(index, slug).map((info) => ({
            key: info.slug,
            label: `${info.romanized} (${info.koreanName})`,
          }))}
          hrefFor={KOREAN_NAME_URLS.check}
          backHref={KOREAN_NAME_URLS.CHECK}
          backLabel={t.check.tryOther}
        />
      </div>
    );
  }

  return (
    <div className={pageStyles.pageContainer}>
      {matches.map((info) => (
        <KoreanNameCheckResult key={info.koreanName} info={info} />
      ))}
      <div className={styles.buttonWrapper}>
        <p className={styles.infoText}>{t.check.tryOther}</p>
        <KoreanNameCheckForm />
        <Link
          href={KOREAN_NAME_URLS.HOME}
          className={`${styles.button} ${localStyles.linkButton}`}
        >
          {t.header.menu.home}
        </Link>
      </div>
    </div>
  );
}
