import { Update } from "../types";

export const updateData: Update = {
 date: "2024-07-30",
 patchNotes: [
  "데이터가 없을 때 보이는 화면이 변경되었습니다. 찾는 이름에 대해 더 자세한 안내를 받을 수 있어요.",
 ],
 names:
  "RiaAspynAlizahCillianHaydenErenRinaEllyEidanFraserGabbyMaddyHoneyLeenaCaesarNessaAshNateElodieRoxyKimmyDanyaGiseleLaniYunaSamiTrixieBeccaSereneDoriePiaCateIrinaDixonGloryDoraAleynaBeatrixTallulahDyaneHalseyLita".match(
   /[A-Z][a-z]+/g
  ) || [],
};

export function getUpdateData(): Update {
 return updateData;
}
