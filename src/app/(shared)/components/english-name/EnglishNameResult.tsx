"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NameData } from "../../types";
import { getPersonalizedComment } from "../../constants";
import {
  getEmoji,
  getSelectedCharacteristicsText,
  preprocessNameData,
  filterNameData,
  getRandomName,
} from "../../utils";
import { useImageCapture, useNavigation } from "../../hooks";
import styles from "./EnglishNameResult.module.css";

interface EnglishNameResultProps {
  result: NameData;
  selectedCharacteristics: number[];
  selectedGender: "male" | "female";
  selectedGeneration: number;
  koreanName: string;
  allNameData: NameData[];
}

export default function EnglishNameResult({
  result,
  selectedCharacteristics,
  selectedGender,
  selectedGeneration,
  koreanName,
  allNameData,
}: EnglishNameResultProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { captureElement } = useImageCapture();
  const { goToEnglishName, openSupport } = useNavigation();

  const handleCapture = () => {
    captureElement(
      "englishNameResultPage",
      `${result.name}-english-name-result`
    );
  };

  const handleRetry = async () => {
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const processedData = preprocessNameData(allNameData);

    const filteredData = filterNameData(processedData, {
      gender: selectedGender,
      generation: selectedGeneration,
      characteristics: selectedCharacteristics,
      excludeName: result.name,
    });

    const randomName = getRandomName(filteredData);

    if (randomName) {
      const params = new URLSearchParams({
        from: "recommendation",
        gender: selectedGender || "",
        generation: selectedGeneration?.toString() || "",
        characteristics: selectedCharacteristics.join(","),
        koreanName: koreanName,
      });

      router.push(`/result/${randomName.name}?${params.toString()}`);
    } else {
      setIsGenerating(false);
      goToEnglishName();
    }
  };

  if (typeof result.characteristic === "undefined") {
    return null;
  }

  const emoji = getEmoji(
    selectedGender === "male" ? "M" : "F",
    result.characteristic
  );
  const characteristicsText = getSelectedCharacteristicsText(
    selectedCharacteristics
  );
  const personalizedComment = getPersonalizedComment(selectedCharacteristics);

  return (
    <div>
      <div id="englishNameResultPage" className={styles.resultPage}>
        <h1 className={styles.title}>
          👩 춘자가 당신에게 추천하는 영어 이름은?
        </h1>
        <h2 className={styles.name}>{result.name}</h2>
        <div className={styles.emojiContainer}>
          <span role="img" aria-label="character" className={styles.largeEmoji}>
            {emoji}
          </span>
        </div>

        <div className={styles.resultContent}>
          <p className={styles.description}>
            <strong>{characteristicsText}</strong> 이미지를 가진{" "}
            <strong>{koreanName}</strong>님!
            <br />
            평소 {personalizedComment} 그렇죠? 😁
            <br />
            그런 {koreanName}님께, <strong>{result.name}</strong> 이름을 추천해
            드려요.
          </p>

          {result.meaning && (
            <p className={styles.meaning}>
              <strong>{result.name}</strong>은(는){" "}
              <strong>&ldquo;{result.meaning}&rdquo;</strong>
              (이)라는 뜻을 가지고 있대요.
            </p>
          )}
        </div>
      </div>

      <div className={styles.retrySection}>
        <span className={styles.tip}>
          TIP : 서양 이름은 종교나 지역에서 유래된 경우가 많답니다. <br />
          의미에 너무 얽매이지 말고, <br />
          직감적으로 마음에 드는 이름을 선택해보세요! ✨
        </span>
        <p className={styles.retryText}>
          혹시 추천받은 이름이 마음에 안 드시나요? <br />
          <span
            className={`${styles.retryLink} ${
              isGenerating ? styles.generating : ""
            }`}
            onClick={isGenerating ? undefined : handleRetry}
            style={{
              cursor: isGenerating ? "not-allowed" : "pointer",
              opacity: isGenerating ? 0.6 : 1,
            }}
          >
            {isGenerating ? "이름 생성 중..." : "한번 더 추천받기 💃"}
          </span>
        </p>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.button} ${styles.captureButton}`}
          onClick={handleCapture}
        >
          결과 저장하기
        </button>
        <button className={styles.button} onClick={goToEnglishName}>
          영어이름 추천 페이지로 돌아가기
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
