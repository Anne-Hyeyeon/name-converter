"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/(ko)/year/year.module.css";
import { trackEvent } from "@/app/(shared)/utils";
import { KOREAN_NAME_URLS } from "../constants";

export default function BornJumpForm({
  dataYears,
  firstYear,
  lastYear,
}: {
  dataYears: number[];
  firstYear: number;
  lastYear: number;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = Number(value);
    if (!Number.isInteger(year) || year < firstYear || year > lastYear) {
      setError(`Please enter a year between ${firstYear} and ${lastYear}.`);
      return;
    }
    const closest = dataYears.reduce((best, candidate) =>
      Math.abs(candidate - year) < Math.abs(best - year) ? candidate : best
    );
    trackEvent("korean_name_born_year", { year });
    router.push(KOREAN_NAME_URLS.born(closest));
  };

  return (
    <form className={styles.jumpCard} onSubmit={handleSubmit}>
      <label htmlFor="korean-birth-year" className={styles.jumpLabel}>
        When were you born?
      </label>
      <div className={styles.jumpRow}>
        <input
          id="korean-birth-year"
          className={styles.jumpInput}
          inputMode="numeric"
          maxLength={4}
          placeholder="e.g. 1995"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
        />
        <button type="submit" className={styles.jumpButton}>
          Show me
        </button>
      </div>
      {error && <p className={styles.jumpError}>{error}</p>}
    </form>
  );
}
