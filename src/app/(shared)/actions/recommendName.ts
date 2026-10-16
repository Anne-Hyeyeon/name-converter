"use server";

import getAllNameData from "../utils/getAllNameData";
import { filterNameData, getRandomName, preprocessNameData } from "../utils";
import { CHARACTERISTIC_OPTIONS, GENERATION_OPTIONS } from "../constants";
import { NameData } from "../types";

interface RecommendNameInput {
  gender: "male" | "female";
  generation: number;
  characteristics: number[];
  excludeName?: string;
}

const GENERATION_VALUES: number[] = GENERATION_OPTIONS.map((o) => o.value);
const CHARACTERISTIC_VALUES: number[] = CHARACTERISTIC_OPTIONS.map((o) => o.value);

const isValidInput = (input: RecommendNameInput): boolean =>
  (input.gender === "male" || input.gender === "female") &&
  GENERATION_VALUES.includes(input.generation) &&
  Array.isArray(input.characteristics) &&
  input.characteristics.length > 0 &&
  input.characteristics.length <= 3 &&
  input.characteristics.every((c) => CHARACTERISTIC_VALUES.includes(c)) &&
  (input.excludeName === undefined || typeof input.excludeName === "string");

export async function recommendName(
  input: RecommendNameInput
): Promise<NameData | null> {
  if (!isValidInput(input)) return null;

  const nameData = preprocessNameData(await getAllNameData());
  return getRandomName(
    filterNameData(nameData, {
      gender: input.gender,
      generation: input.generation,
      characteristics: input.characteristics,
      excludeName: input.excludeName,
    })
  );
}
