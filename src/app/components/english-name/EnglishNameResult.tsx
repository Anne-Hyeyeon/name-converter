"use client";

import React from "react";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { NameData, CHARACTERISTIC_MAP } from "../../types";
import { emojiMap } from "../../constants/resultMessages";
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
  const router = useRouter();

  // SearchResult와 동일한 getEmoji 함수
  const getEmoji = (gender: string, characteristic: number) => {
    const emojiList = emojiMap[gender as keyof typeof emojiMap] || emojiMap.F;
    return emojiList[characteristic - 1] || emojiList[0];
  };

  // 선택된 특성들을 텍스트로 변환
  const getSelectedCharacteristicsText = () => {
    return selectedCharacteristics
      .map(
        (char) => CHARACTERISTIC_MAP[char as keyof typeof CHARACTERISTIC_MAP]
      )
      .join(", ");
  };

  // 선택된 특성들을 기반으로 개인화된 코멘트 생성
  const getPersonalizedComment = () => {
    const characteristicComments: { [key: number]: string[] } = {
      1: [
        "중요한 순간에 앞장서는 타입일 것 같아요.",
        "어디에서든 존재감이 느껴지는 사람일 것 같아요.",
        "주변 사람들에게 힘이 되어주는 사람일 것 같아요.",
      ],
      2: [
        "어떤 상황에서도 굽히지 않는 사람일 것 같아요.",
        "마음속 깊은 곳에 단단함이 있는 사람일 것 같아요.",
        "내면의 힘이 남다른 사람일 것 같아요.",
      ],
      3: [
        "함께 있으면 기분이 좋아지는 사람일 것 같아요.",
        "주변에 따뜻한 에너지를 전해주는 사람일 것 같아요.",
        "사람들의 마음을 편안하게 해주는 타입일 것 같아요.",
        "긍정적인 분위기를 만드는 재능이 있는 사람일 것 같아요.",
      ],
      4: [
        "마음이 따뜻하고 포근한 사람일 것 같아요.",
        "누구에게나 편안함을 주는 사람일 것 같아요.",
        "상대방의 마음을 잘 헤아리는 사람일 것 같아요.",
      ],
      5: [
        "사람들이 자연스럽게 좋아하게 되는 사람일 것 같아요.",
        "특별한 매력이 있어 기억에 남는 사람일 것 같아요.",
        "첫인상부터 호감을 주는 타입일 것 같아요.",
      ],
      6: [
        "어떤 자리에서든 돋보이는 사람일 것 같아요.",
        "센스가 뛰어나고 취향이 좋은 사람일 것 같아요.",
        "고급스러운 분위기를 가진 사람일 것 같아요.",
      ],
      7: [
        "독특한 매력으로 사람들의 관심을 끄는 사람일 것 같아요.",
        "평범하지 않은 특별함이 있는 사람일 것 같아요.",
        "깊이 있는 내면을 가진 사람일 것 같아요.",
        "다른 사람들과는 다른 독창성이 있는 사람일 것 같아요.",
      ],
      8: [
        "깊이 생각하고 행동하는 사람일 것 같아요.",
        "차분하고 안정감 있는 사람일 것 같아요.",
        "중요한 결정을 할 때 믿을 수 있는 사람일 것 같아요.",
        "주변 사람들이 조언을 구하고 싶어하는 타입일 것 같아요.",
      ],
      9: [
        "에너지가 넘치고 활동적인 사람일 것 같아요.",
        "목표를 향해 끝까지 달려가는 사람일 것 같아요.",
        "주변 사람들에게 동기부여가 되는 타입일 것 같아요.",
        "무엇이든 적극적으로 해내는 사람일 것 같아요.",
      ],
      10: [
        "마음이 평화롭고 안정된 사람일 것 같아요.",
        "주변을 차분하게 만드는 힘이 있는 사람일 것 같아요.",
        "누구와도 편안한 관계를 만드는 타입일 것 같아요.",
      ],
      11: [
        "어떤 상황에서도 격조 있게 행동하는 사람일 것 같아요.",
        "클래식한 매력을 가진 사람일 것 같아요.",
        "내면의 아름다움이 빛나는 사람일 것 같아요.",
      ],
      12: [
        "깊이 있는 대화를 나눌 수 있는 사람일 것 같아요.",
        "늘 새로운 것을 배우려는 자세를 가진 사람일 것 같아요.",
        "생각이 깊고 통찰력이 있는 사람일 것 같아요.",
        "주변 사람들이 존경하게 되는 타입일 것 같아요.",
      ],
      13: [
        "새로운 아이디어로 놀라게 하는 사람일 것 같아요.",
        "남다른 시각으로 세상을 보는 사람일 것 같아요.",
        "독창적인 생각을 현실로 만드는 타입일 것 같아요.",
      ],
      14: [
        "처음 만나도 금세 친해지는 사람일 것 같아요.",
        "사교적이고 인맥이 넓은 사람일 것 같아요.",
        "어디서든 사람들과 잘 어울리는 타입일 것 같아요.",
        "모임의 분위기를 밝게 만드는 사람일 것 같아요.",
      ],
      15: [
        "사람들이 자연스럽게 의지하게 되는 사람일 것 같아요.",
        "강한 존재감으로 주목받는 타입일 것 같아요.",
        "중요한 순간에 모든 이의 시선을 끄는 사람일 것 같아요.",
      ],
      16: [
        "에너지가 넘치고 역동적인 사람일 것 같아요.",
        "어디든 빠르게 적응하는 사람일 것 같아요.",
        "늘 새로운 도전을 즐기는 사람일 것 같아요.",
      ],
      17: [
        "어떤 상황에서도 의지할 수 있는 사람일 것 같아요.",
        "책임감이 강하고 신뢰받는 사람일 것 같아요.",
        "주변 사람들의 든든한 버팀목이 되는 타입일 것 같아요.",
        "약속을 지키고 일관성 있는 사람일 것 같아요.",
      ],
      18: [
        "자연스럽게 사람들의 시선을 끄는 사람일 것 같아요.",
        "특별한 매력으로 기억에 오래 남는 사람일 것 같아요.",
        "첫 만남부터 강한 인상을 주는 타입일 것 같아요.",
        "독특한 아름다움을 가진 사람일 것 같아요.",
      ],
    };

    // 선택된 특성 중 랜덤으로 하나 선택
    const randomCharacteristic =
      selectedCharacteristics[
        Math.floor(Math.random() * selectedCharacteristics.length)
      ];

    // 해당 특성의 코멘트들 중 랜덤으로 하나 선택
    const comments = characteristicComments[randomCharacteristic] || [
      "특별한 매력을 가진 사람일 것 같아요",
    ];

    return comments[Math.floor(Math.random() * comments.length)];
  };

  const handleCapture = () => {
    const element = document.getElementById("englishNameResultPage");
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${result.name}-english-name-result.png`;
        link.click();
      });
    }
  };

  const handleRetry = () => {
    // 데이터 전처리
    const processedData = allNameData.map((data) => ({
      ...data,
      characteristic: parseInt(data.characteristic.toString()) || 0,
      feelingNum: parseInt(data.feelingNum?.toString() || "0") || 0,
    }));

    // 같은 조건으로 필터링
    let filtered = processedData;

    // 성별 필터
    filtered = filtered.filter(
      (data) => data.gender === (selectedGender === "male" ? "M" : "F")
    );

    // 세대 필터
    filtered = filtered.filter(
      (data) => data.characteristic === selectedGeneration
    );

    // 특성 필터
    filtered = filtered.filter((data) =>
      selectedCharacteristics.includes(data.feelingNum)
    );

    // 현재 이름 제외
    filtered = filtered.filter((data) => data.name !== result.name);

    if (filtered.length > 0) {
      // 랜덤하게 다른 이름 선택
      const randomIndex = Math.floor(Math.random() * filtered.length);
      const randomName = filtered[randomIndex];

      const params = new URLSearchParams({
        from: "recommendation",
        gender: selectedGender || "",
        generation: selectedGeneration?.toString() || "",
        characteristics: selectedCharacteristics.join(","),
        koreanName: koreanName,
      });

      router.push(`/result/${randomName.name}?${params.toString()}`);
    } else {
      // 조건에 맞는 다른 이름이 없으면 추천 페이지로 이동
      router.push("/your-english-name");
    }
  };

  const handleBack = () => {
    router.push("/your-english-name");
  };

  const handleSupport = () => {
    window.open("https://buymeacoffee.com/annehyeyeon", "_blank");
  };

  if (typeof result.characteristic === "undefined") {
    return null;
  }

  const emoji = getEmoji(
    selectedGender === "male" ? "M" : "F",
    result.characteristic
  );
  const characteristicsText = getSelectedCharacteristicsText();
  const personalizedComment = getPersonalizedComment();

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
            평소 {personalizedComment} 그쵸? 😁
            <br />
            그런 {koreanName}님께, <strong>{result.name}</strong> 이름을 추천해
            드려요.
          </p>

          {result.meaning && (
            <p className={styles.meaning}>
              <strong>{result.name}</strong>은(는){" "}
              <strong>&ldquo;{result.meaning}&rdquo;</strong>
              (이)라는 뜻을 가지고 있답니다. 😆
            </p>
          )}

          {result.comment && (
            <p className={styles.dataComment}>{result.comment}</p>
          )}
        </div>
      </div>

      <div className={styles.retrySection}>
        <p className={styles.retryText}>
          혹시 추천받은 이름이 마음에 안 드시나요? <br />
          <span className={styles.retryLink} onClick={handleRetry}>
            한번 더 추천받기 💃
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
        <button className={styles.button} onClick={handleBack}>
          영어이름 추천 페이지로 돌아가기
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
