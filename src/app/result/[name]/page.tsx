"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./SearchResultPage.module.css"; // CSS 모듈 임포트

export default function SearchResultPage() {
 const { name } = useParams();
 const router = useRouter();
 const [result, setResult] = useState<any>(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   setError("");

   try {
    const res = await fetch(`/api/sheets?name=${name}`);
    const data = await res.json();

    if (res.ok) {
     setResult(data);
    } else {
     setError(data.error);
     setResult(null);
    }
   } catch (err) {
    setError("Failed to fetch data");
    setResult(null);
   } finally {
    setLoading(false);
   }
  };

  if (name) {
   fetchData();
  }
 }, [name]);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>{error}</p>;

 return (
  <div className={styles.resultPage}>
   {result && (
    <>
     <h1 className={styles.name}>{name}</h1>
     <p>
      {name} 이름을 가진 당신은 미국에서{" "}
      <span className={styles.koreanName}>{result.korean_name}</span>
      입니다.
     </p>
     <p>
      미국에서 <span className={styles.trendYear}>{result.trend_year}</span>년도
      느낌의 이름이죠.
     </p>
     {result.male_top_100 || result.female_top_100 ? (
      <p className={styles.highlight}>
       {name}은(는) 미국에서 꾸준히 사랑받는 이름이에요.
      </p>
     ) : null}
     {result.trendy_female_top_100 || result.trendy_male_top_100 ? (
      <p className={styles.highlight}>
       {name}은 2024년도 아기 이름 TOP 100에 드는 이름이에요.
      </p>
     ) : null}
    </>
   )}
   <button className={styles.button} onClick={() => router.push("/")}>
    Go back to Search
   </button>
  </div>
 );
}
