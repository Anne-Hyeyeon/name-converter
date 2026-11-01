"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import NoticePopup from "../modals/NoticePopup";
import GraphNoticePopup from "../modals/GraphNoticePopup";
import { URLS } from "../../constants/urls";
import { trackEvent } from "../../utils";
import { useNameAutocomplete } from "../../hooks";

interface SearchComponentProps {
  names: string[];
}

export default function SearchComponent({ names }: SearchComponentProps) {
  const [showNotice, setShowNotice] = useState(false);
  const [showGraphNotice, setShowGraphNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode | null>(
    null
  );
  const router = useRouter();

  const handleSearch = (name: string, found: boolean) => {
    if (found) {
      trackEvent("search_name", { name });
    } else {
      trackEvent("search_not_found", { query: name });
    }
    router.push(URLS.result(name));
  };

  const {
    query,
    trimmedQuery,
    suggestions,
    listId,
    activeOptionId,
    changeQuery,
    handleKeyDown,
    optionProps,
  } = useNameAutocomplete(names, handleSearch);

  const isSearching = trimmedQuery !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    changeQuery(inputValue);

    const englishOnly = /^[a-zA-Z\u00C0-\u017F\s'-]*$/;

    if (inputValue.length > 20) {
      setErrorMessage(<p>이름이 너무 길어요! 😅</p>);
    } else if (!englishOnly.test(inputValue)) {
      setErrorMessage(
        <>
          <p>한국어, 숫자, 특수문자는 입력이 불가능합니다. 😭</p>
          <p>영어 이름만 입력하세요!</p>
        </>
      );
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>영어 이름을 검색하세요! 🧑‍💻</h1>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={errorMessage ? undefined : handleKeyDown}
        placeholder="영어 이름을 입력하세요. ex) Anne"
        aria-label="영어 이름 검색"
        value={query}
        className={styles.input}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={isSearching && !errorMessage}
        aria-activedescendant={activeOptionId}
        enterKeyHint="search"
        autoComplete="off"
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <div
        className={`${styles.infoContainer} ${isSearching ? styles.hidden : ""}`}
      >
        <div className={styles.imageWrapper}>
          <a
            href="https://buymeacoffee.com/annehyeyeon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/amI.png?v=1"
              alt="내가...춘자였다니..."
              width={250}
              height={250}
              sizes="(max-width: 480px) 60vw, 250px"
              style={{ width: "100%", height: "auto" }}
              className={styles.image}
              priority
            />
          </a>
        </div>
        <p className={styles.infoText}>
          <strong>
            내 영어 이름이 미국에선 &lsquo;춘자&rsquo;일수도 있다고? 🙉
          </strong>
          <strong className={styles.secondLine}>
            내 이름의 유행 시기와 특징을 알아보아요 💃
          </strong>
        </p>
      </div>
      {isSearching && !errorMessage && (
        <ul id={listId} role="listbox" className={styles.resultList}>
          {suggestions.length > 0 ? (
            suggestions.map((name, index) => (
              <li
                key={name}
                {...optionProps(index)}
                onClick={() => handleSearch(name, true)}
                className={styles.resultItem}
              >
                {name}
              </li>
            ))
          ) : (
            <li
              {...optionProps(0)}
              className={styles.resultItem}
              onClick={() => handleSearch(trimmedQuery, false)}
            >
              &quot;{trimmedQuery}&quot;가 없다고요?
            </li>
          )}
        </ul>
      )}
      {!isSearching && (
        <>
          <Link
            href={URLS.ENGLISH_NAME_PAGE}
            className={`${styles.updateNoteLink} ${styles.featuredLink}`}
          >
            NEW : 영어 이름 추천 🚀
          </Link>
          <Link
            href={URLS.TOP100_2025_PAGE}
            className={`${styles.updateNoteLink} ${styles.featuredLink}`}
          >
            🇺🇸 2025 미국 아기이름 트렌드 Top 100
          </Link>
          <Link
            href={URLS.YEAR_PAGE}
            className={`${styles.updateNoteLink} ${styles.featuredLink}`}
          >
            📅 내가 태어난 해 미국 인기 이름
          </Link>
          <button
            type="button"
            className={styles.updateNoteLink}
            onClick={() => {
              trackEvent("graph_notice_open");
              setShowGraphNotice(true);
            }}
          >
            신규 기능 : 이름 그래프가 생겼어요! 🥳
          </button>
          <button
            type="button"
            className={styles.updateNoteLink}
            onClick={() => setShowNotice(true)}
          >
            여러분께 감사 인사 드립니다 💖
          </button>
        </>
      )}
      {showGraphNotice && (
        <GraphNoticePopup onClose={() => setShowGraphNotice(false)} />
      )}
      {showNotice && (
        <NoticePopup onClose={() => setShowNotice(false)} />
      )}
    </div>
  );
}
