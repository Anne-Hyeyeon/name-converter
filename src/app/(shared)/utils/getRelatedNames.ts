import type { NameData } from "../types";

/**
 * 같은 세대, 같은 성별 이름 중 출생아 수가 많은 순서로 고릅니다.
 */
export const getRelatedNames = (
  allNameData: NameData[],
  target: NameData,
  limit = 6
): NameData[] =>
  allNameData
    .filter(
      (data) =>
        data.name !== target.name &&
        data.gender === target.gender &&
        Number(data.characteristic) === Number(target.characteristic) &&
        !!data.koreanName
    )
    .sort((a, b) => (Number(b.births) || 0) - (Number(a.births) || 0))
    .slice(0, limit);
