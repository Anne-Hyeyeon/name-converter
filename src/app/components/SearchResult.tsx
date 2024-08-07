"use client";

import React from "react";
import { NameData } from "../types";
import styles from "./SearchResult.module.css";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

export const generateMetadata = ({ result }: { result: NameData }) => {
  const title = `이름 검색 결과 : ${result.name}은 촌스러운 이름일까?`;
  const description = `${result.name}은 미국에서 촌스러운 이름인지, 트렌디한 이름인지 알아보세요.`;

  return {
    title,
    description,
  };
};

const characteristicMessages = [
  [
    "20세기 초반에 유행했던 이름이에요!",
    "혹시.. 역사적인 인물이세요?",
    "아니면 타임머신 타고 오셨나요? 🕰️",
  ],
  ["'베이비 부머' 세대 이름이에요!", "Peace! ✌️ 히피 느낌이 낭낭하네요!"],
  [
    "X세대에서 많이 사용된 이름이에요!",
    "카세트테이프가 있던 낭만의 시절! 🎸📼",
  ],
  [
    "밀레니얼 세대에서 주로 사용하는 이름이에요!",
    "80~90년대생이라면",
    "이 이름이 완전 찰떡이라고 할 수 있죠!🕺",
  ],
  [
    "엄마들한테 인기가 많은 Z세대 이름이에요!",
    "틱톡, 인스타그램 스토리 감성 그 자체! 📱💃",
  ],
  [
    "예전부터 지금까지 꾸준히 사랑받으면서,",
    "클래식함과 트렌디함이 공존하는 이름이에요!🤩",
  ],
  [
    "앗! 이 이름은 강아지 이름으로 더 자주 쓰여요 🥺",
    "귀여운 강아지에게 양보하세요! 🐕",
  ],
  [
    "이 이름은 미국이 아닌",
    "아프리카, 유럽 등의 지역에서 유래된 이름이에요.",
    "독특한 문화적 배경을 가진 멋진 이름이네요!",
    "이름의 고유한 의미와 아름다움을",
    "그대로 간직해보는 건 어떨까요? 🌍✨",
  ],
  [
    "이 이름은 아시아 사람들이",
    "본명을 따서 지었을 가능성이 커요.",
    "이름의 고유한 의미와 아름다움을",
    "그대로 간직해보는 건 어떨까요? 🌍✨",
  ],
  [
    "검색하신 이름은, 결과를 보여드리기 어려운 이름이에요.",
    "그럼에도 불구하고, 많은 분들이 검색한 이름이라",
    "설명을 위해 데이터에 추가했답니다.",
  ],
];

const emojiMap = {
  F: ["👵", "👩", "👩‍🦰", "👩‍🦱", "👧", "👧", "🐩", "👩‍🦱", "👩", "🤷‍♀️"],
  M: ["👴", "👨", "👨‍🦰", "👨‍🦱", "👦", "👦", "🐕", "👱‍♂️", "👨", "🤷‍♂️"],
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
