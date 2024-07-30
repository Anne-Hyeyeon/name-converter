import { getUpdateData as getUpdateData20240729 } from "../data/20240729";
import { getUpdateData as getUpdateData20240730 } from "../data/20240730"; // 새로운 import 추가

export interface Update {
 date: string;
 patchNotes: string[];
 names: string[];
}

export function getAllUpdateData(): Update[] {
 return [getUpdateData20240729(), getUpdateData20240730()].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
 );
}
