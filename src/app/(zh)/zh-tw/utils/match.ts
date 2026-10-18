import type { NameData } from "@/app/(shared)/types";

/**
 * 미국 세대 정보가 있는 이름만 대만 이름과 짝짓습니다.
 */
export const isTaiwanMatchable = (data: NameData) => {
  const characteristic = Number(data.characteristic);
  return characteristic >= 1 && characteristic <= 6 && !!data.trendYear;
};
