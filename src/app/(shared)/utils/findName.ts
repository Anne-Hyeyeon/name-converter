import { NameData } from "../types";
import { normalizeName } from "./englishNameUtils";

export const findName = (
  allNameData: NameData[],
  name: string
): NameData | undefined => {
  const exactMatch = allNameData.find((data) => data.name === name);
  if (exactMatch) return exactMatch;
  const lowerName = decodeURIComponent(name).toLowerCase();
  return allNameData.find((data) => data.name.toLowerCase() === lowerName);
};

const editDistance = (a: string, b: string): number => {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = prev[j];
      prev[j] = Math.min(
        prev[j] + 1,
        prev[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      diagonal = temp;
    }
  }
  return prev[b.length];
};

export const findSimilarNames = (
  allNameData: NameData[],
  name: string,
  limit = 3
): string[] => {
  const target = normalizeName(decodeURIComponent(name));
  if (target.length < 2) return [];
  const maxDistance = target.length <= 4 ? 1 : 2;

  return allNameData
    .map((data) => ({
      name: data.name,
      distance: editDistance(target, normalizeName(data.name)),
    }))
    .filter((item) => item.distance > 0 && item.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map((item) => item.name);
};
