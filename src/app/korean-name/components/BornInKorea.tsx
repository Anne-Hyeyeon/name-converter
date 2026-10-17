"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/app/(shared)/utils";
import { getDictionary, type Gender } from "../i18n";
import { romanizeName } from "../utils/romanize";
import { KOREAN_NAME_URLS } from "../constants";
import styles from "../korean-name.module.css";

const t = getDictionary();

const closestYear = (years: number[], year: number) =>
  years.reduce((best, candidate) =>
    Math.abs(candidate - year) < Math.abs(best - year) ? candidate : best
  );

export default function BornInKorea({
  top3ByYear,
  defaultGender,
  firstYear,
  lastYear,
}: {
  top3ByYear: Record<number, Record<Gender, string[]>>;
  defaultGender: Gender;
  firstYear: number;
  lastYear: number;
}) {
  const [year, setYear] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender>(defaultGender);

  const dataYears = Object.keys(top3ByYear).map(Number);
  const dataYear = year === null ? null : closestYear(dataYears, year);
  const names = dataYear === null ? [] : top3ByYear[dataYear][gender];
  const birthYears = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => lastYear - i
  );

  return (
    <section className={styles.born} aria-label={t.born.sectionTitle}>
      <h2 className={styles.bornTitle}>{t.born.sectionTitle}</h2>
      <p className={styles.bornLede}>{t.born.sectionLede}</p>
      <div className={styles.bornControls}>
        <select
          className={styles.select}
          aria-label={t.born.yearLabel}
          value={year ?? ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            setYear(value || null);
            if (value) trackEvent("korean_name_born_year", { year: value });
          }}
        >
          <option value="">{t.born.yearPlaceholder}</option>
          {birthYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <div className={styles.genderToggle} role="group">
          {(["F", "M"] as const).map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={gender === g}
              className={`${styles.genderButton} ${
                gender === g ? styles.genderButtonActive : ""
              }`}
              onClick={() => setGender(g)}
            >
              {g === "F" ? t.born.girl : t.born.boy}
            </button>
          ))}
        </div>
      </div>
      {dataYear !== null && (
        <>
          <ol className={styles.bornNames}>
            {names.map((name, index) => (
              <li key={name} className={styles.bornName}>
                <span className={styles.bornRank}>#{index + 1}</span>
                <span className={styles.bornHangul}>{name}</span>
                <span className={styles.bornRomanized}>
                  {romanizeName(name)}
                </span>
              </li>
            ))}
          </ol>
          {dataYear !== year && (
            <p className={styles.bornNote}>{t.born.closest(dataYear)}</p>
          )}
          <Link href={KOREAN_NAME_URLS.born(dataYear)} className={styles.bornLink}>
            {t.born.seeAll(dataYear)}
          </Link>
        </>
      )}
    </section>
  );
}
