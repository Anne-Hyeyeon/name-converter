import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { readTab } from "./lib/sheets.mjs";
import { writeUsNameTabs } from "./lib/us-name-tabs.mjs";

const ssaDir = process.argv[2];
if (!ssaDir) {
  console.error("SSA 데이터 폴더 경로를 넘겨 주세요.");
  process.exit(1);
}

const RANKING_SIZE = 50;

const readSheetNames = async () => {
  const names = new Map();
  for (const { name, gender } of await readTab("names")) {
    if (name && !names.has(name)) names.set(name, gender);
  }
  return names;
};

const files = (await readdir(ssaDir))
  .filter((file) => /^yob\d{4}\.txt$/.test(file))
  .sort();
const years = files.map((file) => Number(file.slice(3, 7)));
const sheetNames = await readSheetNames();

const counts = new Map();
const ranks = new Map();
const rankings = {};

for (const [yearIndex, file] of files.entries()) {
  const lines = (await readFile(join(ssaDir, file), "utf8")).trim().split("\n");
  const rankBySex = { F: 0, M: 0 };
  const ranking = { F: [], M: [] };
  rankings[years[yearIndex]] = ranking;
  for (const line of lines) {
    const [name, sex, countText] = line.trim().split(",");
    const count = Number(countText);
    rankBySex[sex] += 1;
    if (rankBySex[sex] <= RANKING_SIZE) ranking[sex].push([name, count]);
    if (!sheetNames.has(name)) continue;
    const key = `${name}|${sex}`;
    if (!counts.has(key)) {
      counts.set(key, new Array(files.length).fill(0));
      ranks.set(key, new Array(files.length).fill(0));
    }
    counts.get(key)[yearIndex] = count;
    ranks.get(key)[yearIndex] = rankBySex[sex];
  }
}

const sum = (values) => values.reduce((acc, value) => acc + value, 0);
const result = {};

for (const [name, gender] of sheetNames) {
  const female = counts.get(`${name}|F`);
  const male = counts.get(`${name}|M`);
  let sex = gender === "M" || gender === "F" ? gender : null;
  if (!sex || !counts.get(`${name}|${sex}`)) {
    sex = sum(female ?? []) >= sum(male ?? []) ? "F" : "M";
  }
  const yearly = counts.get(`${name}|${sex}`);
  if (!yearly) continue;

  const start = yearly.findIndex((count) => count > 0);
  if (start === -1) continue;

  const yearlyRanks = ranks.get(`${name}|${sex}`);
  let peakIndex = start;
  for (let i = start; i < yearly.length; i++) {
    if (yearly[i] > yearly[peakIndex]) peakIndex = i;
  }
  let bestRankIndex = -1;
  for (let i = 0; i < yearlyRanks.length; i++) {
    if (!yearlyRanks[i]) continue;
    if (bestRankIndex === -1 || yearlyRanks[i] < yearlyRanks[bestRankIndex]) {
      bestRankIndex = i;
    }
  }
  const last = years.length - 1;

  result[name] = {
    sex,
    start: years[start],
    births: yearly.slice(start),
    peakYear: years[peakIndex],
    peakCount: yearly[peakIndex],
    bestRank: yearlyRanks[bestRankIndex],
    bestRankYear: years[bestRankIndex],
    latestRank: yearlyRanks[last] || null,
    latestCount: yearly[last],
    total: sum(yearly),
  };
}

await writeUsNameTabs({
  firstYear: years[0],
  lastYear: years[years.length - 1],
  names: result,
  years: rankings,
});

console.log(
  `${Object.keys(result).length}/${sheetNames.size}개 이름, ${years[0]}-${years[years.length - 1]}년을 시트에 썼습니다.`
);
