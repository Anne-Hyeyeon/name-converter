import { writeFile } from "node:fs/promises";

const ENDPOINT = "https://query.wikidata.org/sparql";
const OUTPUT = "scripts/data/korean-celebrities.json";
const USER_AGENT = "chunja-name-poc/0.1 (https://chunja.vercel.app)";
const RANGES = [
  [1930, 1960],
  [1960, 1970],
  [1970, 1980],
  [1980, 1985],
  [1985, 1990],
  [1990, 1995],
  [1995, 2000],
  [2000, 2005],
  [2005, 2020],
];

const OCCUPATIONS = {
  Q177220: "singer",
  Q2252262: "rapper",
  Q488205: "singer",
  Q639669: "singer",
  Q33999: "actor",
  Q10798782: "actor",
  Q10800557: "actor",
  Q4610556: "model",
};

const OCCUPATION_ORDER = ["singer", "rapper", "actor", "model"];

const TWO_CHAR_SURNAMES = ["남궁", "선우", "독고", "황보", "제갈", "사공", "서문", "동방"];
const ONE_CHAR_SURNAMES = new Set(
  "김이박최정강조윤장임한오서신권황안송류유전홍고문양손배백허남심노하곽성차주우구민진나지엄채원천방공현함변염여추도소석선설마길연위표명기반왕금옥육인맹제모탁국봉어은편용예경봉사부황"
);

const query = (from, to) => `
SELECT ?p ?ko ?en ?birthName ?nativeName ?family ?given ?b ?links ?sex
  (GROUP_CONCAT(DISTINCT STRAFTER(STR(?occ), "entity/"); separator="|") AS ?occs)
  (GROUP_CONCAT(DISTINCT CONCAT(?groupEn, "::", STR(?groupLinks)); separator="|") AS ?groups)
WHERE {
  ?p wdt:P27 wd:Q884; wdt:P106 ?occ; wdt:P569 ?b; wikibase:sitelinks ?links.
  VALUES ?occ { ${Object.keys(OCCUPATIONS).map((id) => `wd:${id}`).join(" ")} }
  FILTER(YEAR(?b) >= ${from} && YEAR(?b) < ${to})
  ?p rdfs:label ?ko FILTER(LANG(?ko) = "ko")
  OPTIONAL { ?p rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?p wdt:P21 ?sex }
  OPTIONAL { ?p wdt:P1477 ?birthName }
  OPTIONAL { ?p wdt:P1559 ?nativeName }
  OPTIONAL { ?p wdt:P734 ?f. ?f rdfs:label ?family FILTER(LANG(?family) = "ko") }
  OPTIONAL { ?p wdt:P735 ?gn. ?gn rdfs:label ?given FILTER(LANG(?given) = "ko") }
  OPTIONAL {
    ?p wdt:P463 ?g. ?g wikibase:sitelinks ?groupLinks.
    ?g rdfs:label ?groupEn FILTER(LANG(?groupEn) = "en")
  }
}
GROUP BY ?p ?ko ?en ?birthName ?nativeName ?family ?given ?b ?links ?sex`;

const fetchRange = async ([from, to]) => {
  const url = `${ENDPOINT}?${new URLSearchParams({ query: query(from, to) })}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      headers: {
        Accept: "application/sparql-results+json",
        "User-Agent": USER_AGENT,
      },
    });
    if (res.ok) return (await res.json()).results.bindings;
    await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
  }
  throw new Error(`${from}-${to} 구간을 받지 못했습니다.`);
};

const isHangulName = (text) => /^[가-힣]{2,5}$/.test(text ?? "");

const splitName = (fullName) => {
  const twoChar = TWO_CHAR_SURNAMES.find((s) => fullName.startsWith(s));
  if (twoChar && fullName.length >= 4) return fullName.slice(2);
  if (ONE_CHAR_SURNAMES.has(fullName[0]) && fullName.length >= 3) {
    return fullName.slice(1);
  }
  return null;
};

const toPerson = (row) => {
  const get = (key) => row[key]?.value;
  const looksLikeFullName = /^[A-Z][a-z]+ [A-Z][a-z]+(-[a-z]+)?$/.test(
    get("en") ?? ""
  );
  const familyAndGiven =
    /^[\uac00-\ud7a3]{1,2}$/.test(get("family") ?? "") &&
    /^[\uac00-\ud7a3]{1,3}$/.test(get("given") ?? "")
      ? get("family") + get("given")
      : null;
  const fullName = [
    get("birthName"),
    get("nativeName"),
    familyAndGiven,
    looksLikeFullName ? get("ko") : null,
  ].find(isHangulName);
  const givenName = fullName && splitName(fullName);
  if (!givenName) return null;
  const occupationIds = new Set((get("occs") ?? "").split("|"));
  const occupations = OCCUPATION_ORDER.filter((occupation) =>
    Object.entries(OCCUPATIONS).some(
      ([id, name]) => name === occupation && occupationIds.has(id)
    )
  );
  const groups = (get("groups") ?? "")
    .split("|")
    .filter(Boolean)
    .map((entry) => entry.split("::"))
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .map(([label]) => label);
  return {
    id: get("p").split("/").pop(),
    en: get("en") ?? get("ko"),
    ko: get("ko"),
    fullName,
    givenName,
    birthYear: Number(get("b").slice(0, 4)),
    gender: { Q6581097: "M", Q6581072: "F" }[get("sex")?.split("/").pop()] ?? null,
    occupations,
    groups,
    links: Number(get("links")),
  };
};

const people = new Map();
for (const range of RANGES) {
  const rows = await fetchRange(range);
  for (const row of rows) {
    const person = toPerson(row);
    if (!person) continue;
    const prev = people.get(person.id);
    if (!prev || person.groups.length > prev.groups.length) {
      people.set(person.id, person);
    }
  }
  console.log(`${range[0]}-${range[1] - 1}: ${rows.length}행, 누적 ${people.size}명`);
  await new Promise((r) => setTimeout(r, 1500));
}

const list = [...people.values()].sort((a, b) => b.links - a.links);
await writeFile(
  OUTPUT,
  JSON.stringify(
    {
      source: "Wikidata (CC0)",
      fetchedAt: new Date().toISOString().slice(0, 10),
      people: list.map((person) => ({
        id: person.id,
        fullName: person.fullName,
        givenName: person.givenName,
        birthYear: person.birthYear,
        gender: person.gender,
        occupations: person.occupations,
        groups: person.groups,
        links: person.links,
      })),
    })
  );
console.log(`${list.length}명을 ${OUTPUT} 에 썼습니다.`);
