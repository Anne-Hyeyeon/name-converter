import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/(shared)/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/app/(shared)/utils/structuredData";
import { notFound } from "next/navigation";
import styles from "@/app/(ko)/top-baby-names-2025/page.module.css";
import yearStyles from "@/app/(ko)/year/year.module.css";
import { getDictionary } from "../../i18n";
import { KOREAN_NAME_URLS } from "../../constants";
import {
  getKoreanYearData,
  type KoreanNameEntry,
} from "../../utils/koreanYearNames";
import { romanizeName, romanizeSlug } from "../../utils/romanize";
import localStyles from "../../korean-name.module.css";

export const dynamicParams = false;

const t = getDictionary();

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getKoreanYearData()).dataYears.map((year) => ({
    year: String(year),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const year = Number((await params).year);
  const title = t.meta.bornTitle(year);
  const description = t.meta.bornDescription(year);
  return {
    title,
    description,
    alternates: { canonical: KOREAN_NAME_URLS.born(year) },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: t.siteName,
      locale: "en_US",
    },
  };
}

const KoreanName = ({
  entry,
  className,
}: {
  entry: KoreanNameEntry | undefined;
  className: string;
}) =>
  entry ? (
    <Link
      href={KOREAN_NAME_URLS.check(romanizeSlug(entry[0]))}
      className={`${className} ${localStyles.tableName}`}
    >
      <span lang="ko">{entry[0]}</span>
      <span className={localStyles.tableRomanized}>{romanizeName(entry[0])}</span>
    </Link>
  ) : (
    <span className={className} />
  );

export default async function KoreanBornYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const year = Number((await params).year);
  const years = await getKoreanYearData();
  const data = years.get(year);
  if (!data) notFound();

  const { prev, next } = years.adjacent(year);
  const rows = Array.from(
    { length: Math.max(data.M.length, data.F.length) },
    (_, i) => ({ rank: i + 1, boy: data.M[i], girl: data.F[i] })
  );
  const podium = rows.slice(0, 3);

  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.header.menu.home, path: KOREAN_NAME_URLS.HOME },
          { name: t.header.menu.born, path: KOREAN_NAME_URLS.BORN },
          { name: String(year), path: KOREAN_NAME_URLS.born(year) },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          t.meta.bornTitle(year),
          rows.flatMap((e) =>
            [e.boy, e.girl]
              .filter((entry): entry is KoreanNameEntry => !!entry)
              .map(([name]) => ({
                name: `${romanizeName(name)} (${name})`,
                path: KOREAN_NAME_URLS.check(romanizeSlug(name)),
              }))
          )
        )}
      />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{t.born.eyebrow(year)}</p>
        <h1 className={styles.title}>{t.born.title(year)}</h1>
        <p className={styles.lede}>{t.born.lede(year)}</p>
        <nav className={yearStyles.stepper} aria-label="Years">
          {prev ? (
            <Link href={KOREAN_NAME_URLS.born(prev)} className={yearStyles.stepButton}>
              {t.born.prev(prev)}
            </Link>
          ) : (
            <span className={yearStyles.stepPlaceholder} />
          )}
          <Link href={KOREAN_NAME_URLS.BORN} className={yearStyles.stepCenter}>
            {t.born.allYears}
          </Link>
          {next ? (
            <Link href={KOREAN_NAME_URLS.born(next)} className={yearStyles.stepButton}>
              {t.born.next(next)}
            </Link>
          ) : (
            <span className={yearStyles.stepPlaceholder} />
          )}
        </nav>
      </header>

      <section className={styles.section} aria-label={t.born.top3}>
        <h2 className={styles.sectionTitle}>{t.born.top3}</h2>
        <ol className={styles.podium}>
          {podium.map((e) => (
            <li
              key={e.rank}
              className={`${styles.podiumItem} ${styles[`rank${e.rank}`]}`}
            >
              <div className={styles.podiumRank}>
                {e.rank === 1 ? "🥇" : e.rank === 2 ? "🥈" : "🥉"}
                <span>#{e.rank}</span>
              </div>
              <div className={styles.podiumNames}>
                <div className={`${styles.podiumNameCol} ${styles.boyCol}`}>
                  <span className={styles.podiumLabel}>{t.born.boy.toUpperCase()}</span>
                  <span className={styles.podiumName} lang="ko">
                    {e.boy?.[0]}
                  </span>
                  <span className={styles.podiumLabel}>
                    {e.boy && romanizeName(e.boy[0])}
                  </span>
                </div>
                <div className={styles.podiumDivider} />
                <div className={`${styles.podiumNameCol} ${styles.girlCol}`}>
                  <span className={styles.podiumLabel}>{t.born.girl.toUpperCase()}</span>
                  <span className={styles.podiumName} lang="ko">
                    {e.girl?.[0]}
                  </span>
                  <span className={styles.podiumLabel}>
                    {e.girl && romanizeName(e.girl[0])}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-label={t.born.topList}>
        <h2 className={styles.sectionTitle}>{t.born.topList}</h2>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span className={styles.colRank}>{t.born.rank}</span>
            <span className={`${styles.colName} ${styles.headerBoy}`}>
              {t.born.boy}
            </span>
            <span className={`${styles.colName} ${styles.headerGirl}`}>
              {t.born.girl}
            </span>
          </div>
          <ul className={styles.tableBody}>
            {rows.map((e) => (
              <li key={e.rank} className={styles.tableRow}>
                <span className={styles.colRank}>{e.rank}</span>
                <KoreanName
                  entry={e.boy}
                  className={`${styles.colName} ${styles.boyName}`}
                />
                <KoreanName
                  entry={e.girl}
                  className={`${styles.colName} ${styles.girlName}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className={styles.footnote}>
        {data.official ? t.born.sourceOfficial : t.born.sourcePress(data.source)}
        {data.note?.includes("1~8월") && ` ${t.born.partialYear}`}
      </p>
    </div>
  );
}
