"use client";

import React from "react";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { NameData } from "../types";
import { characteristicMessages, emojiMap } from "../constants/resultMessages";
import styles from "./SearchResult.module.css";

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
        <div className={styles.mainContent}>
          {Number(result.characteristic) !== 10 && (
            <>
              <p className={styles.infoText}>
                {result.name} 이름을 가진 당신은
              </p>
              <p className={styles.infoText}>
                미국에서{" "}
                <span className={styles.koreanName}>{result.koreanName}</span>{" "}
                입니다.
              </p>
            </>
          )}
          {Number(result.characteristic) !== 7 &&
          Number(result.characteristic) !== 8 &&
          Number(result.characteristic) !== 9 &&
          Number(result.characteristic) !== 10 ? (
            <p className={styles.infoText}>
              주로 <span className={styles.trendYear}>{result.trendYear}</span>{" "}
              년도에 유행했고,
            </p>
          ) : null}

          <div className={styles.messageContainer}>
            {characteristicMessages[result.characteristic - 1]?.map(
              (line, index) => (
                <p key={index} className={styles.infoText}>
                  {line}
                </p>
              )
            )}
          </div>
          {result.name === "Anne" && (
            <>
              <p className={styles.developerNote}>
                이 앱을 만든 개발자의 이름이에요... 소곤소곤
              </p>
              <p className={styles.developerNote}>
                아무래도 이름을 바꿔야 할까봐요...
              </p>
            </>
          )}
        </div>
        <div className={styles.additionalInfo}>
          {result.maleTop || result.femaleTop ? (
            <p className={styles.highlight}>
              <strong>{result.name}</strong>은(는) 미국에서 꾸준히 사랑받는
              이름이에요.
            </p>
          ) : null}
          {result.trendyFemaleTop || result.trendyMaleTop ? (
            <p className={styles.highlight}>
              <strong>{result.name}</strong>은(는) 2024년 아기 이름 TOP 100에
              드는 이름이에요.
            </p>
          ) : null}
          {result.doggyName ? (
            <p className={styles.highlight}>
              <strong>{result.name}</strong>은(는) 반려견 이름으로도 자주
              사용되는 이름이에요!
            </p>
          ) : null}
          {result.comment ? (
            <p className={styles.highlight}>{result.comment}</p>
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
