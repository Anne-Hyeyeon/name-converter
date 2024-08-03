import { getUpdateData as getUpdateData20240729 } from "../data/20240729";
import { getUpdateData as getUpdateData20240730 } from "../data/20240730";
import { getUpdateData as getUpdateData20240804 } from "../data/20240804";
import { Update } from "../types";

export function getAllUpdateData(): Update[] {
 return [
  getUpdateData20240729(),
  getUpdateData20240730(),
  getUpdateData20240804(),
 ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
