export type NameData = {
  name: string;
  koreanName: string;
  gender: string;
  births?: number;
  trendYear: string;
  meaning?: string;
  femaleTop?: boolean;
  maleTop?: boolean;
  trendyFemaleTop?: boolean;
  trendyMaleTop?: boolean;
  doggyName?: boolean;
  characteristic: number;
  feeling?: string;
  feelingNum?: number;
  comment?: string;
};

export const CHARACTERISTIC_MAP = {
  1: "자신감있는",
  2: "강인한",
  3: "밝은",
  4: "부드러운",
  5: "사랑스러운",
  6: "세련된",
  7: "신비로운",
  8: "신중한",
  9: "열정적인",
  10: "온화한",
  11: "우아한",
  12: "지적인",
  13: "창의적인",
  14: "친근한",
  15: "카리스마있는",
  16: "활발한",
  17: "믿음직한",
  18: "매력적인",
} as const;

export const FEELING_NUM_MAP = {
  1: "classic",
  2: "boomer",
  3: "gen X",
  4: "Millennials",
  5: "gen Z",
  6: "꾸준히 인기",
  7: "강아지 이름",
  8: "인터내셔널",
  9: "아시아",
  10: "이름 아님",
} as const;

export interface Update {
  date: string;
  patchNotes: string[];
  names: string[];
}
