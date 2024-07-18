"use client";

import React from "react";
import { NameData } from "../types";
import styles from "./SearchResult.module.css";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

export const generateMetadata = ({ result }: { result: NameData }) => {
 const title = `이름 검색 결과 : ${result.name}은 촌스러운 이름일까?`;
 const description = `${result.name}은 미국에서 촌스러운 이름인지, 트렌지한 이름인지 알아보세요.`;

 return {
  title,
  description,
 };
};

const characteristicMessages = [
 [
  "20세기 초반에 유행했던 이름이에요!",
  "혹시.. 근대사의 주인공이세요? 아니면 타임머신 타고 오셨나요? 🕰️",
 ],
 ["'베이비 부머' 세대 이름이에요!", "Peace! ✌️ 히피 느낌이 낭낭하네요!"],
 ["X세대에서 많이 사용된 이름이에요!", "카세트테이프가 있던 낭만의 시절! 🎸📼"],
 [
  "밀레니얼 세대에서 주로 사용하는 이름이에요!",
  "90년대생이라면 완전 찰떡이라고 할 수 있죠!🕺",
 ],
 ["Z세대 이름이에요!", "틱톡, 인스타 감성 그 자체!🙉"],
 [
  "예전부터 지금까지 꾸준히 사랑받으면서,",
  "클래식함과 트렌디함이 공존하는 이름이죠!🤩",
 ],
];

const emojiMap = {
 F: ["👵", "👩", "👩‍🦰", "👩‍🦱", "👧", "👧"],
 M: ["👴", "👨", "👨‍🦰", "👨‍🦱", "👦", "👦"],
};

interface SearchResultProps {
 result: NameData;
}

export default function SearchResult({ result }: SearchResultProps) {
 const router = useRouter();

 const getEmoji = (gender: string, characteristic: number) => {
  const emojiList = emojiMap[gender as keyof typeof emojiMap] || emojiMap.F;
  return emojiList[characteristic - 1] || emojiList[0];
 };

 const handleCapture = () => {
  const element = document.getElementById("resultPage");
  if (element) {
   html2canvas(element).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${result.name}-result.png`;
    link.click();
   });
  }
 };

 const handleBack = () => {
  router.push("/");
 };

 const handleSupport = () => {
  window.open("https://buymeacoffee.com/annehyeyeon", "_blank");
 };

 if (!result.characteristic) {
  return null;
 }

 const emoji = getEmoji(result.gender, result.characteristic);

 return (
  <div>
   <div id="resultPage" className={styles.resultPage}>
    <h1 className={styles.name}>{result.name}</h1>
    <div className={styles.emojiContainer}>
     <span role="img" aria-label="character" className={styles.largeEmoji}>
      {emoji}
     </span>
    </div>
    <div className={styles.mainContent}>
     <p className={styles.infoText}>{result.name} 이름을 가진 당신은</p>
     <p className={styles.infoText}>
      미국에서 <span className={styles.koreanName}>{result.koreanName}</span>{" "}
      입니다.
     </p>
     <p className={styles.infoText}>
      주로 <span className={styles.trendYear}>{result.trendYear}</span> 년도에
      유행했고,
     </p>
     <div className={styles.messageContainer}>
      {characteristicMessages[result.characteristic - 1]?.map((line, index) => (
       <p key={index} className={styles.infoText}>
        {line}
       </p>
      ))}
     </div>
    </div>
    <div className={styles.additionalInfo}>
     {result.maleTop || result.femaleTop ? (
      <p className={styles.highlight}>
       <strong>{result.name}</strong>은(는) 미국에서 꾸준히 사랑받는 이름이에요.
      </p>
     ) : null}
     {result.trendyFemaleTop || result.trendyMaleTop ? (
      <p className={styles.highlight}>
       <strong>{result.name}</strong>은(는) 2024년 아기 이름 TOP 100에 드는
       이름이에요.
      </p>
     ) : null}
    </div>
   </div>
   <div className={styles.buttonWrapper}>
    <button
     className={`${styles.button} ${styles.captureButton}`}
     onClick={handleCapture}
    >
     결과 저장하기
    </button>
    <button className={styles.button} onClick={handleBack}>
     검색창으로 돌아가기
    </button>
    <button
     className={`${styles.button} ${styles.supportButton}`}
     onClick={handleSupport}
    >
     ☕️ 개발자 응원하기
    </button>
   </div>
  </div>
 );
}
