import { test, expect, open } from "./fixtures";

const RECOMMEND_QUERY =
  "gender=female&generation=4&characteristics=3&koreanName=%ED%98%9C%EC%97%B0";

test.describe("추천 결과 연도별 출생아 수 그래프", () => {
  test("추천 이름의 그래프를 저장 이미지 영역 밖에 보여준다", async ({
    page,
  }) => {
    await open(page, `/recommend/Anne?${RECOMMEND_QUERY}`);
    const trend = page.locator("section", { hasText: "미국에서 태어난 Anne" });
    await expect(trend.locator("svg")).toBeVisible();
    await expect(trend).toContainText("가장 많이 태어난 해: 1959년");
    await expect(trend).toContainText("출처: 미국 사회보장국(SSA)");
    await expect(page.locator("#englishNameResultPage section")).toHaveCount(0);
  });

  test("다시 추천받으면 이전 이름의 그래프는 사라진다", async ({ page }) => {
    await open(page, `/recommend/Anne?${RECOMMEND_QUERY}`);
    await expect(page.getByText("미국에서 태어난 Anne")).toBeVisible();
    await page.getByText("한번 더 추천받기").click();
    await expect(page.locator("h2").first()).not.toHaveText("Anne");
    await expect(page.getByText("미국에서 태어난 Anne")).toHaveCount(0);
  });

  test("SSA에 없는 이름은 그래프 영역이 없다", async ({ page }) => {
    await open(page, `/recommend/Selly?${RECOMMEND_QUERY}`);
    await expect(page.locator("h2").first()).toHaveText("Selly");
    await expect(page.getByText("미국에서 태어난")).toHaveCount(0);
  });
});
