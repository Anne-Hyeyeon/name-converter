"use client";

import React from "react";
import Link from "next/link";
import { NameData } from "../../types";
import { getEmoji } from "../../utils";
import { useImageCapture, useNavigation } from "../../hooks";
import { ResultContent } from "./ResultContent";
import ShareButtons from "./ShareButtons";
import styles from "./SearchResult.module.css";
import { URLS } from "../../constants/urls";

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
  trendChart?: React.ReactNode;
}

export default function SearchResult({
  result,
  trendChart,
}: SearchResultProps) {
  const { captureElement } = useImageCapture();
  const { goToMain, openSupport } = useNavigation();

  const handleCapture = () => {
    captureElement("resultPage", `${result.name}-result`);
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
      {trendChart}
      <div className={styles.buttonWrapper}>
        <Link href={URLS.ENGLISH_NAME_PAGE} className={styles.recommendContainer}>
          <em>
            이미지에 맞는 영어 이름을 추천받고 싶다면?
            <br />
            <strong className={styles.recommendLink}>
              <u>&apos;내가 앤이라니?&apos;</u>
            </strong>{" "}
            바로 가기 ✨
          </em>
        </Link>
        <ShareButtons result={result} />
        <button
          className={`${styles.button} ${styles.captureButton}`}
          onClick={handleCapture}
        >
          결과 저장하기
        </button>
        <button className={styles.button} onClick={goToMain}>
          검색창으로 돌아가기
        </button>
        <button
          className={`${styles.button} ${styles.supportButton}`}
          onClick={openSupport}
        >
          ☕️ 개발자 응원하기
        </button>
      </div>
    </div>
  );
}
