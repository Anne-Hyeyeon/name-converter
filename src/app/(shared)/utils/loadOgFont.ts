import { readFile } from "node:fs/promises";
import { join } from "node:path";

let fontData: Promise<Buffer> | null = null;

export const loadOgFont = () => {
  if (!fontData) {
    fontData = readFile(join(process.cwd(), "assets/fonts/NotoSansKR-Bold.ttf"));
  }
  return fontData;
};
