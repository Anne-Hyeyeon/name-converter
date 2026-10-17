import { en } from "./en";
import type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en };

export const DEFAULT_LOCALE: Locale = "en";

export const getDictionary = (locale: Locale = DEFAULT_LOCALE): Dictionary =>
  dictionaries[locale];

export type { Dictionary, Locale, Gender, GenerationKey } from "./types";
