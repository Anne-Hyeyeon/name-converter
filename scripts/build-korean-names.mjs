import { readFile } from "node:fs/promises";
import { readTab, writeMeta, writeTab } from "./lib/sheets.mjs";

const STATS_INPUT = "data/korean-name/name-stats.json";
const CELEBRITIES_INPUT = "scripts/data/korean-celebrities.json";
const MANUAL_LINKS = 40;

const readJson = async (path) => {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return null;
  }
};

const stats = await readJson(STATS_INPUT);
if (stats) {
  const [firstYear, lastYear] = stats.years;
  const rows = Object.entries(stats.names)
    .filter(([name]) => /^[가-힣]+$/.test(name))
    .map(([name, { M, F, byYear }]) => ({
      name,
      male: M,
      female: F,
      by_year: Array.from(
        { length: lastYear - firstYear + 1 },
        (_, i) => byYear[firstYear + i] ?? 0
      ).join(","),
    }));
  await writeTab("korean_name_stats", ["name", "male", "female", "by_year"], rows);
  await writeMeta({
    korean_stats_first_year: firstYear,
    korean_stats_last_year: lastYear,
    korean_stats_fetched_at: stats.fetchedAt,
  });
} else {
  console.log(`${STATS_INPUT} 이 없어서 이름 통계는 건너뜁니다.`);
}

const celebrities = await readJson(CELEBRITIES_INPUT);
if (celebrities) {
  const groupFixes = new Map(
    (await readTab("korean_celebrity_groups")).map((row) => [
      row.wikidata_id,
      row.group || null,
    ])
  );
  const groupNames = new Map(
    (await readTab("korean_group_names")).map((row) => [
      row.wikidata_label,
      row.display_name,
    ])
  );
  const extra = (await readTab("korean_celebrity_extra")).map((row) => ({
    id: "",
    fullName: row.full_name,
    givenName: row.given_name,
    birthYear: Number(row.birth_year),
    gender: row.gender || null,
    occupations: ["singer"],
    groups: row.group ? [row.group] : [],
    links: MANUAL_LINKS,
  }));

  const people = [...celebrities.people, ...extra].map((person) => {
    const group = groupFixes.has(person.id)
      ? groupFixes.get(person.id)
      : person.groups[0] ?? null;
    return {
      wikidata_id: person.id,
      full_name: person.fullName,
      given_name: person.givenName,
      birth_year: person.birthYear,
      gender: person.gender ?? "",
      occupation: person.occupations[0] ?? "",
      group: group ? groupNames.get(group) ?? group : "",
      links: person.links,
    };
  });

  await writeTab(
    "korean_celebrities",
    [
      "wikidata_id", "full_name", "given_name", "birth_year", "gender",
      "occupation", "group", "links",
    ],
    people.sort((a, b) => b.links - a.links)
  );
  await writeMeta({
    korean_celebrities_source: celebrities.source,
    korean_celebrities_fetched_at: celebrities.fetchedAt,
  });
} else {
  console.log(
    `${CELEBRITIES_INPUT} 이 없어서 연예인 목록은 건너뜁니다. 먼저 node scripts/fetch-korean-celebrities.mjs 를 실행하세요.`
  );
}
