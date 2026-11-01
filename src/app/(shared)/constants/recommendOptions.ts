export type Gender = "male" | "female";
export type Generation = 1 | 2 | 3 | 4 | 5 | 6;

export const GENERATION_OPTIONS = [
  { value: 1, label: "🎩 1920-1940년대 Classic", key: "classic" },
  { value: 2, label: "👴 1940-1960년대 Boomer", key: "boomer" },
  { value: 3, label: "🕺 1960-1980년대 Gen X", key: "gen X" },
  { value: 4, label: "💻 1980-1990년대 Millennials", key: "Millennials" },
  { value: 5, label: "📱 2000년대 이후 Gen Z", key: "gen Z" },
] as const;

export const CHARACTERISTIC_OPTIONS = [
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

export const GENERATION_VALUES: number[] = GENERATION_OPTIONS.map((o) => o.value);
export const CHARACTERISTIC_VALUES: number[] = CHARACTERISTIC_OPTIONS.map(
  (o) => o.value
);
export const MAX_CHARACTERISTICS = 3;
export const KOREAN_NAME_MAX_LENGTH = 10;
