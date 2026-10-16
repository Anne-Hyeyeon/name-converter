import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { google } from "googleapis";

const ssaDir = process.argv[2];
if (!ssaDir) {
  console.error("SSA 데이터 폴더 경로를 넘겨 주세요.");
  process.exit(1);
}

const OUTPUT = "src/app/(shared)/data/name-trends.json";

const readSheetNames = async () => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, "base64").toString()
  );
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "names!A:C",
  });
  const [, ...rows] = response.data.values;
  const names = new Map();
  for (const [name, , gender] of rows) {
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

for (const [yearIndex, file] of files.entries()) {
  const lines = (await readFile(join(ssaDir, file), "utf8")).trim().split("\n");
  const rankBySex = { F: 0, M: 0 };
  for (const line of lines) {
    const [name, sex, countText] = line.trim().split(",");
    const count = Number(countText);
    rankBySex[sex] += 1;
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

await writeFile(
  OUTPUT,
  JSON.stringify({
    source: "U.S. Social Security Administration",
    firstYear: years[0],
    lastYear: years[years.length - 1],
    names: result,
  })
);

console.log(
  `${Object.keys(result).length}/${sheetNames.size}개 이름, ${years[0]}-${years[years.length - 1]}년 -> ${OUTPUT}`
);
