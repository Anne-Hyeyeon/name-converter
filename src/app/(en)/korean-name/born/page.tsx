import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/app/(ko)/top-baby-names-2025/page.module.css";
import yearStyles from "@/app/(ko)/year/year.module.css";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import BornJumpForm from "../components/BornJumpForm";
import { getKoreanYearData } from "../utils/koreanYearNames";
import { romanizeName } from "../utils/romanize";
import localStyles from "../korean-name.module.css";

const t = getDictionary();

export const metadata: Metadata = {
  title: t.meta.bornIndexTitle,
  description: t.meta.bornIndexDescription,
  alternates: { canonical: KOREAN_NAME_URLS.BORN },
};

export const revalidate = 3600;

const YEARLY_FROM = 2000;

const representativeYear = (decade: number, years: number[]) =>
  years.reduce((best, year) =>
    Math.abs(year - (decade + 5)) < Math.abs(best - (decade + 5)) ? year : best
  );

export default async function KoreanBornIndexPage() {
  const koreanYears = await getKoreanYearData();
  const byDecade = new Map<number, number[]>();
  for (const year of [...koreanYears.dataYears].reverse()) {
    const decade = Math.floor(year / 10) * 10;
    byDecade.set(decade, [...(byDecade.get(decade) ?? []), year]);
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{t.born.indexEyebrow}</p>
        <h1 className={styles.title}>{t.born.indexTitle}</h1>
        <p className={styles.lede}>{t.born.indexLede}</p>
      </header>

      <BornJumpForm
        dataYears={koreanYears.dataYears}
        firstYear={1940}
        lastYear={koreanYears.lastYear}
      />

      <section className={styles.section} aria-label={t.born.allYears}>
        <h2 className={styles.sectionTitle}>{t.born.allYears}</h2>
        <div className={yearStyles.decadeList}>
          {[...byDecade].map(([decade, years]) => {
            const yearly = decade >= YEARLY_FROM;
            const shownYear = yearly ? years[0] : representativeYear(decade, years);
            const latest = koreanYears.get(shownYear)!;
            return (
              <section
                key={decade}
                className={yearStyles.decade}
                aria-label={`${decade}s`}
              >
                <div className={yearStyles.decadeHeader}>
                  <h3 className={yearStyles.decadeTitle}>{decade}s</h3>
                  <span className={yearStyles.decadeTop}>
                    👑{" "}
                    <span className={yearStyles.decadeBoy}>
                      {romanizeName(latest.M[0][0])}
                    </span>{" "}
                    ·{" "}
                    <span className={yearStyles.decadeGirl}>
                      {romanizeName(latest.F[0][0])}
                    </span>
                  </span>
                </div>
                {yearly ? (
                  <ul className={yearStyles.yearGrid}>
                    {years.map((year) => (
                      <li key={year}>
                        <Link
                          href={KOREAN_NAME_URLS.born(year)}
                          className={yearStyles.yearLink}
                        >
                          {year}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Link
                    href={KOREAN_NAME_URLS.born(shownYear)}
                    className={`${yearStyles.yearLink} ${localStyles.decadeLink}`}
                  >
                    {t.born.decadeLink(decade, shownYear)}
                  </Link>
                )}
              </section>
            );
          })}
        </div>
      </section>

      <p className={styles.footnote}>
        {t.born.indexSource}
      </p>
    </div>
  );
}
