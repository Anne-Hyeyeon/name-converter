import { Update } from "../types";

export const updateData: Update = {
 date: "2024-09-24",
 patchNotes: ["새롭게 추가된 기능이 없습니다😭 조금만 기다려 주세요!"],
 names: "OrianaKrissDermotShenelle".match(/[A-Z][a-z]+/g) || [],
};

export function getUpdateData(): Update {
 return updateData;
}
