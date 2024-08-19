import { Update } from "../types";

export const updateData: Update = {
 date: "2024-08-20",
 patchNotes: ["휴가를 다녀 오느라 업데이트가 많이 늦었어요 🥺"],
 names:
  "AvaFeliciaKristineYvesSweeneyJennMashaDollyLindenNatiaJenHanniEnoshAdoraRoaYesicaRayleeJerushaJervisEliaIainNarshaNiya".match(
   /[A-Z][a-z]+/g
  ) || [],
};

export function getUpdateData(): Update {
 return updateData;
}
