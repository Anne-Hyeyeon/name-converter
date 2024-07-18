"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { NameData } from "../types";
import styles from "./SearchComponent.module.css";
import ReportPopup from "./ReportPopup";
import Image from "next/image";

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
   .slice(0, 10);
 }, [allNameData, query]);

 const handleSearch = (name: NameData) => {
  router.push(`/result/${name.name}`);
 };

 return (
  <div className={styles.container}>
   <h1 className={styles.title}>영어 이름을 검색하세요! 🧑‍💻🇺🇸</h1>
   <input
    type="text"
    onChange={(e) => setQuery(e.target.value)}
    placeholder="영어 이름을 입력하세요. ex) Anne"
    value={query}
    className={styles.input}
   />
   <div
    className={`${styles.infoContainer} ${
     query.trim() !== "" && styles.hidden
    }`}
   >
    <div className={styles.imageWrapper}>
     <a
      href="https://buymeacoffee.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
     >
      <Image
       src="/amI.png?v=1"
       alt="내가...춘자였다니..."
       layout="responsive"
       width={250}
       height={250}
       className={styles.image}
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
       <span onClick={() => setShowPopup(true)} className={styles.reportLink}>
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
