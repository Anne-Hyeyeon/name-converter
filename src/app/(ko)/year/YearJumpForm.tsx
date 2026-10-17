"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./year.module.css";

interface YearJumpFormProps {
  firstYear: number;
  lastYear: number;
}

export default function YearJumpForm({
  firstYear,
  lastYear,
}: YearJumpFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = Number(value);
    if (!Number.isInteger(year) || year < firstYear || year > lastYear) {
      setError(`${firstYear}년부터 ${lastYear}년 사이로 입력해 주세요.`);
      return;
    }
    router.push(`/year/${year}`);
  };

  return (
    <form className={styles.jumpCard} onSubmit={handleSubmit}>
      <label htmlFor="birth-year" className={styles.jumpLabel}>
        태어난 해를 입력해 보세요
      </label>
      <div className={styles.jumpRow}>
        <input
          id="birth-year"
          className={styles.jumpInput}
          inputMode="numeric"
          maxLength={4}
          placeholder="예: 1995"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/\D/g, ""));
            setError("");
          }}
        />
        <button type="submit" className={styles.jumpButton}>
          보러 가기
        </button>
      </div>
      {error && <p className={styles.jumpError}>{error}</p>}
    </form>
  );
}
