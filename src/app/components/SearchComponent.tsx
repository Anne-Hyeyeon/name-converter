"use client";

import { useState, useMemo } from "react";
import SearchResult from "../result/[name]/page";

type NameData = {
  [key: string]: string;
};

interface SearchComponentProps {
  allNameData: NameData[];
}

export default function SearchComponent({ allNameData }: SearchComponentProps) {
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState<NameData | null>(null);

  const filteredNames = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return [];
    return allNameData
      .filter((data) => data.name.toLowerCase().startsWith(trimmedQuery))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allNameData, query]);

  const handleSearch = (name: NameData) => {
    setSelectedName(name);
  };

  const handleGoBack = () => {
    setSelectedName(null);
  };

  if (!allNameData) {
    return <div>Loading...</div>;
  }

  if (selectedName) {
    return (
      <div>
        <SearchResult result={selectedName} />
        <button onClick={handleGoBack}>다시 하기</button>
      </div>
    );
  }

  return (
    <div>
      <h1>영어 이름을 검색하세요!</h1>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a name"
        value={query}
      />
      {query.trim() !== "" && (
        <ul>
          {filteredNames.length > 0 ? (
            filteredNames.map((name) => (
              <li key={name.name} onClick={() => handleSearch(name)}>
                {name.name}
              </li>
            ))
          ) : (
            <li>검색 결과가 없습니다</li>
          )}
        </ul>
      )}
    </div>
  );
}
