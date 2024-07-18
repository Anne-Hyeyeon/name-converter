import React from "react";
import { NameData } from "../types";
import styles from "./SearchResult.module.css";

const characteristicMessages = [
  [
    "20세기 초반에 유행했던 이름이에요!",
    "혹시.. 대한민국 근현대사의 주인공이세요? 아니면 타임머신 타고 오셨나요? 🕰️",
  ],
  [
    "'베이비 부머' 세대의 대표적인 이름이에요!",
    "peace! ✌️ 히피 느낌이 낭낭하네요!",
  ],
  [
    "X세대에서 많이 사용된 이름이에요!",
    "y2k란 바로 이런 거다! 카세트테이프 꺼내볼까요? 📼",
  ],
  [
    "밀레니얼 세대에서 주로 사용하는 이름이에요!",
    "90년대생이라면 찰떡같이 맞는 이름! 🕺",
  ],
  ["Z세대 이름이에요!", "틱톡, 인스타 감성 그 자체!🙉"],
  [
    "예전부터 지금까지 꾸준히 사랑받는 이름이에요!",
    "클래식함과 트렌디가 공존하는 이름!🤩",
  ],
];

const emojiMap = {
  F: ["👵", "👩", "👩‍🦰", "👩‍🦱", "👧"],
  M: ["👴", "👨", "👨‍🦰", "👨‍🦱", "👦"],
};

interface SearchResultProps {
  result: NameData;
}

export default function SearchResult({ result }: SearchResultProps) {
  const getEmoji = (gender: string, characteristic: number) => {
    const emojiList = emojiMap[gender as keyof typeof emojiMap] || emojiMap.F;
    return emojiList[characteristic - 1] || emojiList[0];
  };

  const emoji = getEmoji(result.gender, result.characteristic);

  return (
    <div className={styles.resultPage}>
      <h1 className={styles.name}>{result.name}</h1>
      <div className={styles.emojiContainer}>
        <span role="img" aria-label="character" className={styles.largeEmoji}>
          {emoji}
        </span>
      </div>
      <div className={styles.mainContent}>
        <p className={styles.infoText}>
          {result.name} 이름을 가진 당신은 미국에서{" "}
          <span className={styles.koreanName}>{result.koreanName}</span> 입니다.
        </p>
        <p className={styles.infoText}>
          주로 <span className={styles.trendYear}>{result.trendYear}</span>{" "}
          년도에 유행했고,
        </p>
        <div className={styles.messageContainer}>
          {characteristicMessages[result.characteristic - 1].map(
            (line, index) => (
              <p key={index} className={styles.infoText}>
                {line}
              </p>
            )
          )}
        </div>
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
            <strong>{result.name}</strong>은 2024년도 아기 이름 TOP 100에 드는
            이름이에요.
          </p>
        ) : null}
      </div>
    </div>
  );
}
