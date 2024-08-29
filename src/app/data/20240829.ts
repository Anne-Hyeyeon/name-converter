import { Update } from "../types";

export const updateData: Update = {
 date: "2024-08-29",
 patchNotes: ["'(재미로 보는) 이름 궁합 보기 서비스'를 준비 중이에요!"],
 names:
  "DavedSouthWestNorthKittenAlyaLeilynIsoldeLiloRaoul".match(/[A-Z][a-z]+/g) ||
  [],
};

export function getUpdateData(): Update {
 return updateData;
}
