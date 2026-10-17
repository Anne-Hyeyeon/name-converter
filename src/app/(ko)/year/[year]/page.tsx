import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/(shared)/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
} from "@/app/(shared)/utils/structuredData";
import { notFound } from "next/navigation";
import styles from "@/app/(ko)/top-baby-names-2025/page.module.css";
import yearStyles from "../year.module.css";
import getAllNameData from "@/app/(shared)/utils/getAllNameData";
import {
  getRankingRange,
  getRankingYears,
  getYearRanking,
} from "@/app/(shared)/utils/getYearRanking";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getRankingYears()).map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const title = `${year}년 미국 인기 아기 이름 Top 50 - 내가 춘자라니`;
  const description = `${year}년에 미국에서 가장 많이 태어난 남자 이름, 여자 이름 Top 50. ${year}년생 미국 동갑 친구들은 어떤 이름이었을까요?`;

  return {
    title,
    description,
    alternates: { canonical: `/year/${year}` },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "내가 춘자라니",
    },
  };
}

const NameLink = ({
  name,
  linkable,
  className,
  children,
}: {
  name: string;
  linkable: boolean;
  className: string;
  children: React.ReactNode;
}) =>
  linkable ? (
    <Link href={`/result/${name}`} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);
  const ranking = await getYearRanking(year);
  const { first: RANKING_FIRST_YEAR, last: RANKING_LAST_YEAR } =
    await getRankingRange();
  if (!ranking) notFound();

  const knownNames = new Set((await getAllNameData()).map((data) => data.name));
  const rows = ranking.M.map(([boy], i) => ({
    rank: i + 1,
    boy,
    girl: ranking.F[i]?.[0] ?? "",
  }));
  const podium = rows.slice(0, 3);

  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "내가 춘자라니", path: "/" },
          { name: "태어난 해 미국 인기 이름", path: "/year" },
          { name: `${year}년`, path: `/year/${year}` },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          `${year}년 미국 인기 아기 이름 Top 50`,
          rows.flatMap((e) => [
            { name: e.boy, path: knownNames.has(e.boy) ? `/result/${e.boy}` : undefined },
            { name: e.girl, path: knownNames.has(e.girl) ? `/result/${e.girl}` : undefined },
          ])
        )}
      />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>BABY NAMES · USA {year}</p>
        <h1 className={styles.title}>
          {year}년 미국에서
          <br />
          가장 많이 태어난 이름들.
        </h1>
        <p className={styles.lede}>
          {year}년에 미국에서 태어난 아이들에게 가장 많이 붙여진 이름 Top
          50이에요.
          <br />
          {year}년생이라면, 미국 동갑 친구들은 이런 이름이었을 거예요 👀
        </p>
        <nav className={yearStyles.stepper} aria-label="연도 이동">
          {year > RANKING_FIRST_YEAR ? (
            <Link href={`/year/${year - 1}`} className={yearStyles.stepButton}>
              ‹ {year - 1}
            </Link>
          ) : (
            <span className={yearStyles.stepPlaceholder} />
          )}
          <Link href="/year" className={yearStyles.stepCenter}>
            연도 고르기
          </Link>
          {year < RANKING_LAST_YEAR ? (
            <Link href={`/year/${year + 1}`} className={yearStyles.stepButton}>
              {year + 1} ›
            </Link>
          ) : (
            <span className={yearStyles.stepPlaceholder} />
          )}
        </nav>
      </header>

      <section className={styles.section} aria-label="Top 3">
        <h2 className={styles.sectionTitle}>Top 3</h2>
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
                <NameLink
                  name={e.boy}
                  linkable={knownNames.has(e.boy)}
                  className={`${styles.podiumNameCol} ${styles.boyCol}`}
                >
                  <span className={styles.podiumLabel}>BOY</span>
                  <span className={styles.podiumName}>{e.boy}</span>
                </NameLink>
                <div className={styles.podiumDivider} />
                <NameLink
                  name={e.girl}
                  linkable={knownNames.has(e.girl)}
                  className={`${styles.podiumNameCol} ${styles.girlCol}`}
                >
                  <span className={styles.podiumLabel}>GIRL</span>
                  <span className={styles.podiumName}>{e.girl}</span>
                </NameLink>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-label="전체 Top 50">
        <h2 className={styles.sectionTitle}>전체 Top 50</h2>
        <p className={styles.tableHelper}>
          이름을 누르면 결과 페이지로 이동해요.
        </p>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span className={styles.colRank}>Rank</span>
            <span className={`${styles.colName} ${styles.headerBoy}`}>Boy</span>
            <span className={`${styles.colName} ${styles.headerGirl}`}>
              Girl
            </span>
          </div>
          <ul className={styles.tableBody}>
            {rows.map((e) => (
              <li key={e.rank} className={styles.tableRow}>
                <span className={styles.colRank}>{e.rank}</span>
                {knownNames.has(e.boy) ? (
                  <Link
                    href={`/result/${e.boy}`}
                    className={`${styles.colName} ${styles.boyName}`}
                  >
                    {e.boy}
                  </Link>
                ) : (
                  <span className={`${styles.colName} ${yearStyles.plainName}`}>
                    {e.boy}
                  </span>
                )}
                {knownNames.has(e.girl) ? (
                  <Link
                    href={`/result/${e.girl}`}
                    className={`${styles.colName} ${styles.girlName}`}
                  >
                    {e.girl}
                  </Link>
                ) : (
                  <span className={`${styles.colName} ${yearStyles.plainName}`}>
                    {e.girl}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className={styles.footnote}>
        출처: 미국 사회보장국(SSA) 출생 이름 통계. 같은 순위에 남/녀 한 명씩, 총
        100명의 이름이 있어요.
      </p>
    </div>
  );
}
