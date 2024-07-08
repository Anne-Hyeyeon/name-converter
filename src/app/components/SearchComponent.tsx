"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchComponent.module.css"; // 스타일링을 위한 CSS 모듈

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (name: string) => {
    router.push(`/result/${name}`);
  };

  const fetchSuggestions = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sheets?query=${query}`);
      const data = await res.json();
      if (res.ok) {
        setSuggestions(data.length ? data : ["검색 결과가 없습니다"]);
      }
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => {
      if (query) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchSuggestions(query);
  }, [query, debouncedFetchSuggestions]);

  return (
    <div className={styles.searchComponent}>
      <h1>영어 이름을 검색하세요!</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a name"
        className={styles.searchInput}
      />
      {loading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <div className={styles.suggestionsBox}>
          <ul className={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={styles.suggestionItem}
                onClick={() =>
                  suggestion !== "검색 결과가 없습니다" &&
                  handleSearch(suggestion)
                }
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: void, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
