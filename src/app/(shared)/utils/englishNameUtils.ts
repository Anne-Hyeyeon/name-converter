import { NameData, CHARACTERISTIC_MAP } from "../types";
import { emojiMap } from "../constants";
import { Gender, Generation } from "../constants/recommendOptions";

/**
 * 성별과 특성 번호에 따라 적절한 이모지를 반환합니다.
 */
export const getEmoji = (gender: string, characteristic: number): string => {
  const emojiList = emojiMap[gender as keyof typeof emojiMap] || emojiMap.F;
  return emojiList[characteristic - 1] || emojiList[0];
};

/**
 * 선택된 특성 번호들을 한국어 텍스트로 변환합니다.
 */
export const getSelectedCharacteristicsText = (
  selectedCharacteristics: number[]
): string => {
  return selectedCharacteristics
    .map((char) => CHARACTERISTIC_MAP[char as keyof typeof CHARACTERISTIC_MAP])
    .join(", ");
};

/**
 * 이름 데이터를 숫자 필드 변환 등 전처리합니다.
 */
export const preprocessNameData = (nameData: NameData[]): NameData[] => {
  return nameData.map((data) => ({
    ...data,
    characteristic: parseInt(data.characteristic.toString()) || 0,
    feelingNum: parseInt(data.feelingNum?.toString() || "0") || 0,
  }));
};

/**
 * 필터링 조건에 따라 이름 데이터를 필터링합니다.
 */
export const filterNameData = (
  nameData: NameData[],
  filters: {
    gender: "male" | "female";
    generation: number;
    characteristics: number[];
    excludeName?: string;
  }
): NameData[] => {
  let filtered = nameData;

  // 성별 필터
  filtered = filtered.filter(
    (data) => data.gender === (filters.gender === "male" ? "M" : "F")
  );

  // 세대 필터
  filtered = filtered.filter(
    (data) => data.characteristic === filters.generation
  );

  // 특성 필터 - feelingNum이 존재하고 선택된 특성에 포함되는 경우만
  filtered = filtered.filter((data) => {
    const feelingNum = data.feelingNum;
    return (
      feelingNum !== undefined && filters.characteristics.includes(feelingNum)
    );
  });

  // 특정 이름 제외
  if (filters.excludeName) {
    filtered = filtered.filter((data) => data.name !== filters.excludeName);
  }

  return filtered;
};

/**
 * 조건부 필터링 - 각 조건이 있을 때만 필터링을 적용합니다.
 */
export const filterNameDataConditionally = (
  nameData: NameData[],
  filters: {
    gender?: Gender | null;
    generation?: Generation | null;
    characteristics?: number[];
  }
): NameData[] => {
  let filtered = nameData;

  // 성별 필터 (선택된 경우만)
  if (filters.gender) {
    filtered = filtered.filter(
      (data) => data.gender === (filters.gender === "male" ? "M" : "F")
    );
  }

  // 세대 필터 (선택된 경우만)
  if (filters.generation) {
    filtered = filtered.filter(
      (data) => data.characteristic === filters.generation
    );
  }

  // 특성 필터 (선택된 특성이 있는 경우만)
  if (filters.characteristics && filters.characteristics.length > 0) {
    filtered = filtered.filter((data) => {
      const feelingNum = data.feelingNum;
      return (
        feelingNum !== undefined &&
        filters.characteristics!.includes(feelingNum)
      );
    });
  }

  return filtered;
};

/**
 * 필터링된 데이터에서 랜덤하게 하나의 이름을 선택합니다.
 */
export const getRandomName = (nameData: NameData[]): NameData | null => {
  if (nameData.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * nameData.length);
  return nameData[randomIndex];
};
