import { getUpdateData as getUpdateData20240729 } from "../data/20240729";

export interface Update {
 date: string;
 patchNotes: string[];
 names: string[];
}

export function getAllUpdateData(): Update[] {
 return [getUpdateData20240729()].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
 );
}
