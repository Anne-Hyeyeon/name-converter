"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { NameData } from "../types";
import styles from "./SearchComponent.module.css";
import ReportPopup from "./ReportPopup";

interface SearchComponentProps {
  allNameData: NameData[];
}

export default function SearchComponent({ allNameData }: SearchComponentProps) {
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const filteredNames = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];
    return allNameData
      .filter((data) => data.name.toLowerCase().startsWith(trimmedQuery))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10); // 최대 10개의 결과만 표시
  }, [allNameData, query]);

  const handleSearch = (name: NameData) => {
    router.push(`/result/${name.name}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>영어 이름을 검색하세요!</h1>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a name"
        value={query}
        className={styles.input}
      />
      {query.trim() !== "" && (
        <ul className={styles.resultList}>
          {filteredNames.length > 0 ? (
            filteredNames.map((name) => (
              <li
                key={name.name}
                onClick={() => handleSearch(name)}
                className={styles.resultItem}
              >
                {name.name}
              </li>
            ))
          ) : (
            <li className={styles.noResult}>
              찾는 이름이 없습니다!{" "}
              <span
                onClick={() => setShowPopup(true)}
                className={styles.reportLink}
              >
                <br />
                이름 제보하기🙉
              </span>
            </li>
          )}
        </ul>
      )}
      {showPopup && <ReportPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
