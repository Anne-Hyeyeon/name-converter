"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/(shared)/components/search/SearchComponent.module.css";
import { normalizeName, trackEvent } from "@/app/(shared)/utils";
import { zh } from "../i18n";
import { ZH_URLS } from "../constants";
import localStyles from "../zh.module.css";

export type ZhExample = { name: string; twName: string };

export default function ZhNameSearch({
  names,
  examples,
}: {
  names: string[];
  examples: ZhExample[];
}) {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const filteredNames = useMemo(() => {
    const trimmed = normalizeName(query.trim());
    if (!trimmed) return [];
    return names.filter((name) => normalizeName(name).startsWith(trimmed)).slice(0, 10);
  }, [names, query]);

  const goToResult = (name: string, found: boolean) => {
    trackEvent(found ? "zh_name_search" : "zh_name_not_found", { name });
    router.push(ZH_URLS.result(name));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 20) setErrorMessage(zh.landing.tooLong);
    else if (!/^[a-zA-ZÀ-ſ\s'-]*$/.test(value)) setErrorMessage(zh.landing.englishOnly);
    else setErrorMessage(null);
  };

  const isSearching = query.trim() !== "";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{zh.landing.title}</h1>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={zh.landing.placeholder}
        value={query}
        className={styles.input}
        aria-label={zh.landing.placeholder}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className={`${styles.infoContainer} ${isSearching && styles.hidden}`}>
        <p className={localStyles.pitch}>
          {zh.landing.pitch.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              <mark className={localStyles.pitchMark}>{line}</mark>
            </span>
          ))}
        </p>
        <p className={localStyles.lede}>
          {zh.landing.lede.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
        {examples.length > 0 && (
          <section aria-label={zh.landing.exampleLabel}>
            <p className={localStyles.exampleLabel}>{zh.landing.exampleLabel}</p>
            <ul className={localStyles.examples}>
              {examples.map((example) => (
                <li key={example.name}>
                  <Link href={ZH_URLS.result(example.name)} className={localStyles.example}>
                    <span className={localStyles.exampleName}>{example.name}</span>
                    <span className={localStyles.exampleArrow}>→</span>
                    <span className={localStyles.exampleTw}>{example.twName}</span>
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
              <li key={name} onClick={() => goToResult(name, true)} className={styles.resultItem}>
                {name}
              </li>
            ))
          ) : (
            <li className={styles.resultItem} onClick={() => goToResult(query.trim(), false)}>
              {zh.landing.notListed(query.trim())}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
