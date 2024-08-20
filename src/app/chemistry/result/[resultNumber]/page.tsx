import React from "react";
import getAllChemistryData from "@/app/utils/getAllChemistryData";
import styles from "./Result.module.css";
import { notFound } from "next/navigation";
import router from "next/navigation";
import Link from "next/link";

interface ResultPageProps {
 params: { resultNumber: string; name1: string; name2: string };
}
export default async function ResultPage({ params }: ResultPageProps) {
 try {
  const { resultNumber } = params;
  const chemistryData = await getAllChemistryData();
  const resultData = chemistryData.find(
   (data) => data.resultNumber === resultNumber
  );

  if (!resultData) {
   notFound();
  }

  return (
   <div className={styles.container}>
    <h1 className={styles.title}>Chemistry Result</h1>
    <div className={styles.result}>
     <p>
      <strong>Character 1:</strong> {resultData.character1}
     </p>
     <p>
      <strong>Character 2:</strong> {resultData.character2}
     </p>
     <p>
      이 둘이 미국에서 만난다면? 둘은... <em>{/* 추가적인 시나리오 로직 */}</em>
     </p>
     <p>{resultData.line1}</p>
     <p>{resultData.line2}</p>
     <p>{resultData.line3}</p>
     <p>{resultData.line4}</p>
     <div className={styles.scenario}></div>
    </div>
    <Link href={`/chemistry`} className={styles.backButton}>
     검색창으로 돌아가기
    </Link>
   </div>
  );
 } catch (error) {
  console.error("Error in ResultPage:", error);
  return (
   <div className={styles.error}>
    Error loading result. Please try again later.
   </div>
  );
 }
}
