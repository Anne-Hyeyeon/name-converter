import { Update } from "../types";

export const updateData: Update = {
  date: "2024-08-04",
  patchNotes: [
    "결과를 보여드리기 어려운 이름에 대한 속성 페이지가 추가되었어요. 제보가 자주 들어오지만, 실제 이름으로 사용되지 않는 것들에 대한 설명을 제공해요.",
    "제보한 이름이 누락된다고요? 이름이 이탈리아, 프랑스 등 영어가 모국어가 아닌 국가에서 사용되는 이름일 가능성이 커요. (ex. Elio, Jean-Pierre) 🥺 아이돌 이름, 가수의 활동명일 경우에도 결과에서 제외시키고 있어요!",
  ],
  names:
    "HermioneJadelynNanaRioSeraYuriNiallCurryVegaDoveArwenMingMartinoNeveLeonieJunoDemianVerenaUsherRowellDondaAstorSaffronAvrilPrueWickTroyeDipperXaydenRaviBlytheViviNaraMaddieJoonHestonStarkBaderDaenerysShiaChylerAnnabethViktorWilly".match(
      /[A-Z][a-z]+/g
    ) || [],
};

export function getUpdateData(): Update {
  return updateData;
}
