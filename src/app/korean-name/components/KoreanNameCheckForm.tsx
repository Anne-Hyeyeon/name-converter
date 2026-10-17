"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/app/(shared)/utils";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import { isHangul, normalizeRomanized } from "../utils/romanize";
import styles from "../korean-name.module.css";

const t = getDictionary();

export default function KoreanNameCheckForm() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    const slug = isHangul(trimmed) ? trimmed : normalizeRomanized(trimmed);
    if (!slug) return;
    trackEvent("korean_name_check", { query: trimmed });
    router.push(KOREAN_NAME_URLS.check(slug));
  };

  return (
    <form className={styles.checkForm} onSubmit={handleSubmit}>
      <input
        className={styles.checkInput}
        value={value}
        maxLength={20}
        placeholder={t.check.placeholder}
        aria-label={t.check.placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className={styles.checkButton}>
        {t.check.button}
      </button>
    </form>
  );
}
