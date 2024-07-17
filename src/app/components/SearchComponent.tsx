"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface SearchComponentProps {
 names: string[];
}

export default function SearchComponent({ names }: SearchComponentProps) {
 const [query, setQuery] = useState("");
 const router = useRouter();

 const filteredNames = useMemo(() => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];
  return names
   .filter((name) => name.toLowerCase().startsWith(trimmedQuery.toLowerCase()))
   .sort((a, b) => a.localeCompare(b)); // 오름차순 정렬
 }, [names, query]);

 const handleSearch = (name: string) => {
  router.push(`/result/${name}`);
 };

 return (
  <div>
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
       <li key={name} onClick={() => handleSearch(name)}>
        {name}
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
