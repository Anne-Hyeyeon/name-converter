import React from "react";
import Link from "next/link";
import styles from "@/app/(shared)/components/search/NameNotFound.module.css";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import localStyles from "../korean-name.module.css";

const t = getDictionary();

export default function KoreanNameNotFound({
  query,
  suggestions,
  hrefFor,
  backHref,
  backLabel,
}: {
  query: string;
  suggestions: { key: string; label: string }[];
  hrefFor: (key: string) => string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div>
      <div className={styles.resultPage}>
        <h1 className={styles.name}>{query}</h1>
        <div className={styles.emojiContainer}>
          <span role="img" aria-label="thinking" className={styles.largeEmoji}>
            🤔
          </span>
        </div>
        <div className={styles.mainContent}>
          <p className={styles.infoText}>{t.check.notFound(query)}</p>
          {suggestions.length > 0 && (
            <p className={styles.infoText}>
              {t.check.didYouMean}{" "}
              {suggestions.map((s, index) => (
                <React.Fragment key={s.key}>
                  {index > 0 && ", "}
                  <Link href={hrefFor(s.key)} className={styles.similarName}>
                    {s.label}
                  </Link>
                </React.Fragment>
              ))}
              ?
            </p>
          )}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Link href={backHref} className={`${styles.button} ${localStyles.linkButton}`}>
          {backLabel}
        </Link>
        <Link href={KOREAN_NAME_URLS.BORN} className={`${styles.button} ${localStyles.linkButton}`}>
          {t.header.menu.born}
        </Link>
      </div>
    </div>
  );
}
