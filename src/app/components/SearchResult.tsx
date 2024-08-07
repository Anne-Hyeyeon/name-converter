"use client";

import React from "react";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { NameData } from "../types";
import { characteristicMessages, emojiMap } from "../constants/resultMessages";
import styles from "./SearchResult.module.css";
import { ResultContent } from "./ResultContent";

export const generateMetadata = ({ result }: { result: NameData }) => {
  const title = `이름 검색 결과 : ${result.name}은 촌스러운 이름일까?`;
  const description = `${result.name}은 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보세요.`;

  return {
    title,
    description,
  };
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

  if (typeof result.characteristic === "undefined") {
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
        <ResultContent result={result} />
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
