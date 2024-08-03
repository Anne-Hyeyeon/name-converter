import { Update } from "../types";

export const updateData: Update = {
 date: "2024-07-29",
 patchNotes: [
  "미국이 아닌, 아프리카나 유럽 등 다른 문화권에서 온 이름에 대한 속성이 추가되었어요! ex) Nika",
  "아시아 문화권 사람들이 본명을 따서 만든 이름에 대한 속성이 추가되었어요. ex) Jia",
  "강아지 이름으로 더 자주 쓰이는 이름에 대한 속성이 추가되었어요. ex) Cookie",
 ],
 names:
  "ZoeyDannahMoanaArinCookieAwaSooSellyCerlineRosyHannyRobellCloverMoureenJiaYoungLizzyHeraCloudOjayNeroBrightNikaJiePocahontasSeulZeroYujinElinaOceanTitiIsuSuzieArsCleviaCocoDobbyJinnySkippyJulySofieGenieSophyElonDomenicoKeilyJellySugarSherlockYenaBekiBehatiBelitaSuriAerinAsterJubileeGreetRomeroYerielSiaLuckyLiahAnselmoJinaIlyas".match(
   /[A-Z][a-z]+/g
  ) || [],
};

export function getUpdateData(): Update {
 return updateData;
}
