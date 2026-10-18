import { execFileSync } from "node:child_process";
import { writeMeta, writeTab } from "./lib/sheets.mjs";

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error("내정부 全國姓名統計分析 PDF 경로를 넘겨 주세요. 예: scripts/data/tw/112namestat.pdf");
  process.exit(1);
}

const EDITION = "內政部 全國姓名統計分析 (中華民國112年6月30日)";
const SOURCE_URL = "https://www.ris.gov.tw/documents/data/5/2/112namestat.pdf";
const MINGUO_OFFSET = 1911;
const TABLE_TITLE = "各出生年前十大名字排名與人數按性別分";

const text = execFileSync("pdftotext", ["-layout", pdfPath, "-"], {
  encoding: "utf8",
  maxBuffer: 256 * 1024 * 1024,
});

const lines = text.split("\n");
const start = lines.findIndex(
  (line, i) => line.includes(TABLE_TITLE) && i > 1000
);
if (start < 0) throw new Error(`${TABLE_TITLE} 표를 찾지 못했습니다.`);

const rows = [];
let gender = null;
for (let i = start; i < lines.length && i < start + 200; i++) {
  const line = lines[i];
  if (/^\s*男性\s*$/.test(line)) gender = "M";
  if (/^\s*女性\s*$/.test(line)) gender = "F";
  const head = line.match(/民國(\d+)年\s*名字\s+(.+)$/);
  if (!head || !gender) continue;
  const tail = lines[i + 1].match(/至(\d+)年(6月)?\s*人數\s+(.+)$/);
  if (!tail) throw new Error(`${i + 2}번째 줄에서 인원수를 찾지 못했습니다.`);
  const names = head[2].trim().split(/\s+/);
  const counts = tail[3].trim().split(/\s+/).map((n) => Number(n.replace(/,/g, "")));
  if (names.length !== 10 || counts.length !== 10) {
    throw new Error(`${i + 1}번째 줄의 이름 또는 인원수가 10개가 아닙니다.`);
  }
  const from = Number(head[1]) + MINGUO_OFFSET;
  const to = Number(tail[1]) + MINGUO_OFFSET;
  names.forEach((name, index) =>
    rows.push({
      decade_from: from,
      decade_to: to,
      gender,
      rank: index + 1,
      name,
      count: counts[index],
    })
  );
  if (gender === "F" && to >= 2023) break;
}

if (rows.length !== 12 * 2 * 10) {
  throw new Error(`행이 ${rows.length}개입니다. 240개가 나와야 합니다.`);
}

await writeTab(
  "tw_decade_names",
  ["decade_from", "decade_to", "gender", "rank", "name", "count"],
  rows
);
await writeMeta({ tw_names_source: EDITION, tw_names_source_url: SOURCE_URL });
