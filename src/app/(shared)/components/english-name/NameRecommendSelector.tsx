"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { NameData } from "../../types";
import {
  Gender,
  Generation,
  GENERATION_OPTIONS,
  CHARACTERISTIC_OPTIONS,
} from "../../constants/recommendOptions";
import {
  preprocessNameData,
  filterNameDataConditionally,
  getRandomName,
} from "../../utils";
import { useNavigation } from "../../hooks";
import styles from "./NameRecommendSelector.module.css";

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
  const { goToEnglishName } = useNavigation();

  const processedData = useMemo(() => {
    return preprocessNameData(allNameData);
  }, [allNameData]);

  const filteredData = useMemo(() => {
    return filterNameDataConditionally(processedData, {
      gender: selectedGender,
      generation: selectedGeneration,
      characteristics: selectedCharacteristics,
    });
  }, [
    processedData,
    selectedGender,
    selectedGeneration,
    selectedCharacteristics,
  ]);

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

    await new Promise((resolve) => setTimeout(resolve, 400));

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
    } else {
      setIsGenerating(false);
      goToEnglishName();
    }
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

  return (
    <div className={styles.container}>
      {/* 0단계: 한국 이름 입력 */}
      <div className={styles.step}>
        <h2 className={styles.sectionTitle}>한국 이름을 알려주세요!</h2>
        <input
          type="text"
          value={koreanName}
          onChange={(e) => setKoreanName(e.target.value)}
          placeholder="예: 민지, 수현, 지훈"
          className={styles.koreanNameInput}
          maxLength={10}
          disabled={isGenerating}
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
              disabled={isGenerating}
            >
              🙋‍♂️ 남성
            </button>
            <button
              className={`${styles.genderButton} ${
                selectedGender === "female" ? styles.selected : ""
              }`}
              onClick={() => setSelectedGender("female")}
              disabled={isGenerating}
            >
              🙋‍♀️ 여성
            </button>
          </div>
        </div>
      )}

      {/* 2단계: 세대 선택 */}
      {koreanName.trim() && selectedGender && (
        <div className={styles.step}>
          <h2 className={styles.sectionTitle}>2. 나는 어떤 세대일까?</h2>
          <div className={styles.generationButtons}>
            {GENERATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`${styles.generationButton} ${
                  selectedGeneration === option.value ? styles.selected : ""
                }`}
                onClick={() => setSelectedGeneration(option.value)}
                disabled={isGenerating}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3단계: 특성 선택 */}
      {koreanName.trim() && selectedGeneration && (
        <div className={styles.step}>
          <h2 className={styles.sectionTitle}>
            3. 나를 나타내는 키워드는? <br />
            (최대 3개 선택)
          </h2>
          <p className={styles.subtitle}>{selectedCharacteristics.length}/3</p>
          <div className={styles.characteristicGrid}>
            {CHARACTERISTIC_OPTIONS.map((option) => {
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
                  } ${isLongText ? styles.longText : ""} ${
                    isGenerating ? styles.disabled : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCharacteristics.includes(option.value)}
                    onChange={() => handleCharacteristicChange(option.value)}
                    disabled={
                      isGenerating ||
                      (selectedCharacteristics.length >= 3 &&
                        !selectedCharacteristics.includes(option.value))
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
            {isGenerating ? "이름 생성 중..." : "이름 추천 받기 🚀"}
          </button>

          <button
            className={styles.resetButton}
            onClick={resetSelection}
            disabled={isGenerating}
          >
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
