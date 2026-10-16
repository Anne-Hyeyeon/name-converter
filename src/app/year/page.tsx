import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/app/top-baby-names-2025/page.module.css";
import yearStyles from "./year.module.css";
import YearJumpForm from "./YearJumpForm";
import {
  getRankingYears,
  getYearRanking,
  RANKING_FIRST_YEAR,
  RANKING_LAST_YEAR,
} from "@/app/(shared)/utils/getYearRanking";

export const metadata: Metadata = {
  title: "태어난 해 미국 인기 이름 - 내가 춘자라니",
  description: `${RANKING_FIRST_YEAR}년부터 ${RANKING_LAST_YEAR}년까지, 내가 태어난 해에 미국에서 가장 많이 태어난 이름을 알아보세요.`,
  alternates: { canonical: "/year" },
};

const OLDER_THAN = 1950;

const mostFrequent = (names: string[]) => {
  const counts = new Map<string, number>();
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
};

type Decade = { decade: number; years: number[]; boy: string; girl: string };

const DecadeCard = ({ decade, years, boy, girl }: Decade) => (
  <section className={yearStyles.decade} aria-label={`${decade}년대`}>
    <div className={yearStyles.decadeHeader}>
      <h2 className={yearStyles.decadeTitle}>{decade}년대</h2>
      <span className={yearStyles.decadeTop}>
        👑 <span className={yearStyles.decadeBoy}>{boy}</span> ·{" "}
        <span className={yearStyles.decadeGirl}>{girl}</span>
      </span>
    </div>
    <ul className={yearStyles.yearGrid}>
      {years.map((year) => (
        <li key={year}>
          <Link href={`/year/${year}`} className={yearStyles.yearLink}>
            {year}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default function YearIndexPage() {
  const byDecade = new Map<number, number[]>();
  for (const year of getRankingYears().reverse()) {
    const decade = Math.floor(year / 10) * 10;
    byDecade.set(decade, [...(byDecade.get(decade) ?? []), year]);
  }
  const decades: Decade[] = [...byDecade].map(([decade, years]) => ({
    decade,
    years,
    boy: mostFrequent(years.map((year) => getYearRanking(year)!.M[0][0])),
    girl: mostFrequent(years.map((year) => getYearRanking(year)!.F[0][0])),
  }));
  const recent = decades.filter((d) => d.decade >= OLDER_THAN);
  const older = decades.filter((d) => d.decade < OLDER_THAN);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          BABY NAMES · USA {RANKING_FIRST_YEAR}-{RANKING_LAST_YEAR}
        </p>
        <h1 className={styles.title}>
          내가 태어난 해,
          <br />
          미국 인기 이름은?
        </h1>
        <p className={styles.lede}>
          태어난 해를 고르면 그해 미국에서 가장 많이 태어난 이름 Top 50을
          보여드려요.
        </p>
      </header>

      <YearJumpForm
        firstYear={RANKING_FIRST_YEAR}
        lastYear={RANKING_LAST_YEAR}
      />

      <section className={styles.section} aria-label="10년 단위로 둘러보기">
        <h2 className={styles.sectionTitle}>10년 단위로 둘러보기</h2>
        <p className={styles.tableHelper}>
          👑 표시는 그 10년 동안 가장 자주 1위를 한 이름이에요.
        </p>
        <div className={yearStyles.decadeList}>
          {recent.map((decade) => (
            <DecadeCard key={decade.decade} {...decade} />
          ))}
        </div>
        <details className={yearStyles.older}>
          <summary className={yearStyles.olderSummary}>
            {OLDER_THAN}년 이전 보기 ({RANKING_FIRST_YEAR}-{OLDER_THAN - 1})
          </summary>
          <div className={yearStyles.decadeList}>
            {older.map((decade) => (
              <DecadeCard key={decade.decade} {...decade} />
            ))}
          </div>
        </details>
      </section>

      <p className={styles.footnote}>
        출처: 미국 사회보장국(SSA) 출생 이름 통계
      </p>
    </div>
  );
}
