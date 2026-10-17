import "server-only";
import { getSheetTab } from "./getSheetTab";

export type Top100Entry = { rank: number; boy: string; girl: string };

export const getTop100 = async (): Promise<Top100Entry[]> =>
  (await getSheetTab("us_top100_2025"))
    .map((row) => ({ rank: Number(row.rank), boy: row.boy, girl: row.girl }))
    .sort((a, b) => a.rank - b.rank);

export const getTop100Names = async (): Promise<Set<string>> =>
  new Set((await getTop100()).flatMap((entry) => [entry.boy, entry.girl]));
