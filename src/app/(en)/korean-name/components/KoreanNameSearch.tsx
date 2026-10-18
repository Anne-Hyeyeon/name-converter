"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/(shared)/components/search/SearchComponent.module.css";
import { normalizeName, trackEvent } from "@/app/(shared)/utils";
import { getDictionary } from "../i18n";
import { KOREAN_NAME_URLS } from "../constants";
import localStyles from "../korean-name.module.css";

const t = getDictionary();

export type NameExample = {
  name: string;
  koreanName: string;
  romanized: string;
  label: string;
};

export default function KoreanNameSearch({
  names,
  examples,
}: {
  names: string[];
  examples: NameExample[];
}) {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const filteredNames = useMemo(() => {
    const trimmedQuery = normalizeName(query.trim());
    if (!trimmedQuery) return [];
    return names
      .filter((name) => normalizeName(name).startsWith(trimmedQuery))
      .slice(0, 10);
  }, [names, query]);

  const goToResult = (name: string, found: boolean) => {
    trackEvent(found ? "korean_name_search" : "korean_name_not_found", {
      name,
    });
    router.push(KOREAN_NAME_URLS.result(name));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue.length > 20) {
      setErrorMessage(t.landing.tooLong);
    } else if (!/^[a-zA-ZÀ-ſ\s'-]*$/.test(inputValue)) {
      setErrorMessage(t.landing.englishOnly);
    } else {
      setErrorMessage(null);
    }
  };

  const isSearching = query.trim() !== "";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t.landing.title}</h1>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={t.landing.placeholder}
        value={query}
        className={styles.input}
        aria-label={t.landing.placeholder}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}
      <div
        className={`${styles.infoContainer} ${isSearching && styles.hidden}`}
      >
        <div className={localStyles.heroEmoji}>
          <span role="img" aria-label={t.landing.heroEmojiLabel}>
            👩
          </span>
        </div>
        <p className={localStyles.pitch}>
          {t.landing.introStrong.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              <mark className={localStyles.pitchMark}>{line}</mark>
            </span>
          ))}
        </p>
        <p className={localStyles.lede}>
          {t.landing.introSecond.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        {examples.length > 0 && (
          <section aria-label={t.landing.exampleLabel}>
            <p className={localStyles.exampleLabel}>{t.landing.exampleLabel}</p>
            <ul className={localStyles.examples}>
              {examples.map((example) => (
                <li key={example.name}>
                  <Link
                    href={KOREAN_NAME_URLS.result(example.name)}
                    className={localStyles.example}
                  >
                    <span className={localStyles.exampleName}>
                      {example.name}
                    </span>
                    <span className={localStyles.exampleArrow}>→</span>
                    <span className={localStyles.exampleKorean}>
                      <span lang="ko" className={localStyles.exampleHangul}>
                        {example.koreanName}
                      </span>
                      <span className={localStyles.exampleRomanized}>
                        {example.romanized}
                      </span>
                    </span>
                    <span className={localStyles.exampleBadge}>
                      {example.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {isSearching && !errorMessage && (
        <ul className={styles.resultList}>
          {filteredNames.length > 0 ? (
            filteredNames.map((name) => (
              <li
                key={name}
                onClick={() => goToResult(name, true)}
                className={styles.resultItem}
              >
                {name}
              </li>
            ))
          ) : (
            <li
              className={styles.resultItem}
              onClick={() => goToResult(query.trim(), false)}
            >
              {t.landing.notListed(query.trim())}
            </li>
          )}
        </ul>
      )}
      {!isSearching && (
        <>
          <Link
            href={KOREAN_NAME_URLS.BORN}
            className={`${styles.updateNoteLink} ${styles.featuredLink}`}
          >
            {t.landing.bornLink}
          </Link>
          <Link
            href={KOREAN_NAME_URLS.CHECK}
            className={`${styles.updateNoteLink} ${styles.featuredLink}`}
          >
            {t.landing.checkLink}
          </Link>
        </>
      )}
    </div>
  );
}
