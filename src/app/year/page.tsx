import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/app/top-baby-names-2025/page.module.css";
import yearStyles from "./year.module.css";
import {
  getRankingYears,
  RANKING_FIRST_YEAR,
  RANKING_LAST_YEAR,
} from "@/app/(shared)/utils/getYearRanking";

export const metadata: Metadata = {
  title: "태어난 해 미국 인기 이름 - 내가 춘자라니",
  description: `${RANKING_FIRST_YEAR}년부터 ${RANKING_LAST_YEAR}년까지, 내가 태어난 해에 미국에서 가장 많이 태어난 이름을 알아보세요.`,
  alternates: { canonical: "/year" },
};

export default function YearIndexPage() {
  const decades = new Map<number, number[]>();
  for (const year of getRankingYears().reverse()) {
    const decade = Math.floor(year / 10) * 10;
    decades.set(decade, [...(decades.get(decade) ?? []), year]);
  }

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

      {[...decades].map(([decade, years]) => (
        <section key={decade} className={yearStyles.decade}>
          <h2 className={yearStyles.decadeTitle}>{decade}년대</h2>
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
      ))}

      <p className={styles.footnote}>
        출처: 미국 사회보장국(SSA) 출생 이름 통계
      </p>
    </div>
  );
}
