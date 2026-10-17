import type { Dictionary, Gender, GenerationKey } from "../i18n";

const CHARACTERISTIC_GENERATIONS: Record<number, GenerationKey> = {
  1: "silentGen",
  2: "boomer",
  3: "genX",
  4: "millennial",
  5: "genZ",
  6: "timeless",
  7: "puppy",
  8: "unique",
  9: "unique",
};

/**
 * 시트의 세대 번호를 한국 세대 구분으로 바꿉니다. 결과를 보여줄 수 없는 이름은 null입니다.
 */
export const getGenerationByCharacteristic = (
  characteristic: number
): GenerationKey | null => CHARACTERISTIC_GENERATIONS[characteristic] ?? null;

/**
 * 한국에서 가장 유행한 연도로 세대 구분을 정합니다.
 */
export const getGenerationByYear = (year: number): GenerationKey => {
  if (year < 1940) return "silentGen";
  if (year < 1960) return "boomer";
  if (year < 1980) return "genX";
  if (year < 2000) return "millennial";
  if (year < 2015) return "genZ";
  return "genAlpha";
};

export const toGender = (gender: string | undefined): Gender =>
  gender === "M" ? "M" : "F";

export const getGenerationLabel = (
  t: Dictionary,
  generation: GenerationKey
): string => t.generations[generation].label;
