import { getUpdateData as getUpdateData20240729 } from "../data/20240729";
import { getUpdateData as getUpdateData20240730 } from "../data/20240730";
import { getUpdateData as getUpdateData20240804 } from "../data/20240804";
import { getUpdateData as getUpdateData20240820 } from "../data/20240820";
import { getUpdateData as getUpdateData20240829 } from "../data/20240829";
import { getUpdateData as getUpdateData20240924 } from "../data/20240924";
import { Update } from "../types";

export function getAllUpdateData(): Update[] {
 return [
  getUpdateData20240729(),
  getUpdateData20240730(),
  getUpdateData20240804(),
  getUpdateData20240820(),
  getUpdateData20240829(),
  getUpdateData20240924(),
 ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
