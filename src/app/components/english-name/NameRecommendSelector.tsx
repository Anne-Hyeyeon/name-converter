"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { NameData } from "../../types";
import styles from "./NameRecommendSelector.module.css";

type Gender = "male" | "female";
type Generation = 1 | 2 | 3 | 4 | 5 | 6;

interface NameRecommendSelectorProps {
  allNameData: NameData[];
}

export default function NameRecommendSelector({
  allNameData,
}: NameRecommendSelectorProps) {
  const [koreanName, setKoreanName] = useState("");
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedGeneration, setSelectedGeneration] =
    useState<Generation | null>(null);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    number[]
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const generationOptions = [
    { value: 1, label: "🎩 1920-1940년대 Classic", key: "classic" },
    { value: 2, label: "👴 1940-1960년대 Boomer", key: "boomer" },
    { value: 3, label: "🕺 1960-1980년대 Gen X", key: "gen X" },
    { value: 4, label: "💻 1980-1990년대 Millennials", key: "Millennials" },
    { value: 5, label: "📱 2000년대 이후 Gen Z", key: "gen Z" },
  ] as const;

  const characteristicOptions = [
    { value: 1, label: "💪 자신감있는", emoji: "💪" },
    { value: 2, label: "🦁 강인한", emoji: "🦁" },
    { value: 3, label: "☀️ 밝은", emoji: "☀️" },
    { value: 4, label: "🕊️ 부드러운", emoji: "🕊️" },
    { value: 5, label: "💕 사랑스러운", emoji: "💕" },
    { value: 6, label: "✨ 세련된", emoji: "✨" },
    { value: 7, label: "🔮 신비로운", emoji: "🔮" },
    { value: 8, label: "🤔 신중한", emoji: "🤔" },
    { value: 9, label: "🔥 열정적인", emoji: "🔥" },
    { value: 10, label: "🌸 온화한", emoji: "🌸" },
    { value: 11, label: "👑 우아한", emoji: "👑" },
    { value: 12, label: "🧠 지적인", emoji: "🧠" },
    { value: 13, label: "🎨 창의적인", emoji: "🎨" },
    { value: 14, label: "🤗 친근한", emoji: "🤗" },
    { value: 15, label: "⚡ 카리스마", emoji: "⚡" },
    { value: 16, label: "🏃 활발한", emoji: "🏃" },
    { value: 17, label: "🛡️ 믿음직한", emoji: "🛡️" },
    { value: 18, label: "😍 매력적인", emoji: "😍" },
  ];

  // 데이터 전처리: 한 번만 실행
  const processedData = useMemo(() => {
    return allNameData.map((data) => ({
      ...data,
      characteristic: parseInt(data.characteristic.toString()) || 0,
      feelingNum: parseInt(data.feelingNum?.toString() || "0") || 0,
    }));
  }, [allNameData]);

  // 필터링된 데이터 생성 (이제 간단하고 빠름)
  const filteredData = useMemo(() => {
    let filtered = processedData;

    // 성별 필터
    if (selectedGender) {
      filtered = filtered.filter(
        (data) => data.gender === (selectedGender === "male" ? "M" : "F")
      );
    }

    // 세대 필터 (이제 숫자로 직접 비교)
    if (selectedGeneration) {
      filtered = filtered.filter(
        (data) => data.characteristic === selectedGeneration
      );
    }

    // 특성 필터 (이제 숫자로 직접 비교)
    if (selectedCharacteristics.length > 0) {
      filtered = filtered.filter((data) =>
        selectedCharacteristics.includes(data.feelingNum)
      );
    }

    return filtered;
  }, [
    processedData,
    selectedGender,
    selectedGeneration,
    selectedCharacteristics,
  ]);

  const getRandomName = (nameArray: NameData[]): NameData | null => {
    if (nameArray.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * nameArray.length);
    return nameArray[randomIndex];
  };

  const handleCharacteristicChange = (value: number) => {
    setSelectedCharacteristics((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else if (prev.length < 3) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleGenerateNames = async () => {
    setIsGenerating(true);

    // 로딩 효과를 위한 약간의 지연 (2-3초)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // 조건에 맞는 이름 중 랜덤으로 하나 선택해서 결과 페이지로 이동
    const randomName = getRandomName(filteredData);

    if (randomName) {
      const params = new URLSearchParams({
        from: "recommendation",
        gender: selectedGender || "",
        generation: selectedGeneration?.toString() || "",
        characteristics: selectedCharacteristics.join(","),
        koreanName: koreanName.trim(),
      });

      router.push(`/result/${randomName.name}?${params.toString()}`);
    }

    setIsGenerating(false);
  };

  const resetSelection = () => {
    setKoreanName("");
    setSelectedGender(null);
    setSelectedGeneration(null);
    setSelectedCharacteristics([]);
  };

  const canGenerate =
    koreanName.trim() &&
    selectedGender &&
    selectedGeneration &&
    selectedCharacteristics.length > 0;

  // 로딩 상태일 때 로딩 페이지 렌더링
  if (isGenerating) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <h2 className={styles.loadingTitle}>
            춘자👩가 {koreanName}님께 잘 맞는 이름을 생각하고 있어요.
          </h2>
          <p className={styles.loadingSubtitle}>잠시만 기다려 주세요</p>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 0단계: 한국 이름 입력 */}
      <div className={styles.step}>
        <h2 className={styles.sectionTitle}>당신의 한국 이름을 알려주세요</h2>
        <input
          type="text"
          value={koreanName}
          onChange={(e) => setKoreanName(e.target.value)}
          placeholder="예: 민지, 수현, 지훈"
          className={styles.koreanNameInput}
          maxLength={10}
        />
      </div>

      {/* 1단계: 성별 선택 */}
      {koreanName.trim() && (
        <div className={styles.step}>
          <h2 className={styles.sectionTitle}>1. 성별을 선택해주세요</h2>
          <div className={styles.genderButtons}>
            <button
              className={`${styles.genderButton} ${
                selectedGender === "male" ? styles.selected : ""
              }`}
              onClick={() => setSelectedGender("male")}
            >
              🙋‍♂️ 남성
            </button>
            <button
              className={`${styles.genderButton} ${
                selectedGender === "female" ? styles.selected : ""
              }`}
              onClick={() => setSelectedGender("female")}
            >
              🙋‍♀️ 여성
            </button>
          </div>
        </div>
      )}

      {/* 2단계: 세대 선택 */}
      {selectedGender && (
        <div className={styles.step}>
          <h2 className={styles.sectionTitle}>2. 나는 어떤 세대일까?</h2>
          <div className={styles.generationButtons}>
            {generationOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.generationButton} ${
                  selectedGeneration === option.value ? styles.selected : ""
                }`}
                onClick={() => setSelectedGeneration(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3단계: 특성 선택 */}
      {selectedGeneration && (
        <div className={styles.step}>
          <h2 className={styles.sectionTitle}>
            3. 당신을 나타내는 키워드는? <br />
            (최대 3개 선택)
          </h2>
          <p className={styles.subtitle}>{selectedCharacteristics.length}/3</p>
          <div className={styles.characteristicGrid}>
            {characteristicOptions.map((option) => {
              const textOnly = option.label.replace(
                /[^\u3131-\u3163\uac00-\ud7a3]/g,
                ""
              );
              const isLongText = textOnly.length >= 5;

              return (
                <label
                  key={option.value}
                  className={`${styles.characteristicOption} ${
                    selectedCharacteristics.includes(option.value)
                      ? styles.selected
                      : ""
                  } ${
                    selectedCharacteristics.length >= 3 &&
                    !selectedCharacteristics.includes(option.value)
                      ? styles.disabled
                      : ""
                  } ${isLongText ? styles.longText : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCharacteristics.includes(option.value)}
                    onChange={() => handleCharacteristicChange(option.value)}
                    disabled={
                      selectedCharacteristics.length >= 3 &&
                      !selectedCharacteristics.includes(option.value)
                    }
                  />
                  <span className={styles.checkboxLabel}>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 추천 버튼 */}
      {canGenerate && (
        <div className={styles.generateSection}>
          <button
            className={styles.generateButton}
            onClick={handleGenerateNames}
            disabled={isGenerating || filteredData.length === 0}
          >
            {isGenerating ? "이름 생성 중... 🎲" : "이름 추천받기 👩"}
          </button>

          <button className={styles.resetButton} onClick={resetSelection}>
            다시 선택하기
          </button>
        </div>
      )}

      {/* 조건에 맞는 이름이 없을 때 */}
      {canGenerate && filteredData.length === 0 && (
        <div className={styles.noResultSection}>
          <p className={styles.noResultText}>
            선택하신 조건에 맞는 이름이 없습니다. 😅
            <br />
            다른 조건을 선택해보세요!
          </p>
        </div>
      )}
    </div>
  );
}
