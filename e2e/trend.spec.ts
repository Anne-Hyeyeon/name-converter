import { test, expect, open } from "./fixtures";

test.describe("연도별 출생아 수 그래프", () => {
  test("이름의 정점 연도와 최근 순위를 보여준다", async ({ page }) => {
    await open(page, "/result/Anne");
    const trend = page.locator("section", { hasText: "미국에서 태어난 Anne" });
    await expect(trend.locator("svg")).toBeVisible();
    await expect(trend).toContainText("가장 많이 태어난 해: 1959년");
    await expect(trend).toContainText(/2025년 순위: [\d,]+위/);
    await expect(trend).toContainText("출처: 미국 사회보장국(SSA)");
    await expect(trend).not.toContainText("다시 인기");
  });

  test("다시 유행하는 옛 이름에는 재유행 안내가 붙는다", async ({ page }) => {
    await open(page, "/result/Henry");
    await expect(page.getByText("옛날 이름이 요즘 다시 인기예요")).toBeVisible();
  });

  test("아주 드문 이름은 그래프 대신 안내를 보여준다", async ({ page }) => {
    await open(page, "/result/Sherlock");
    const trend = page.locator("section", { hasText: "미국에서 태어난 Sherlock" });
    await expect(trend).toContainText("미국에서도 아주 드문 이름이에요");
    await expect(trend.locator("svg")).toHaveCount(0);
  });

  test("SSA에 없는 이름은 그래프 영역이 없다", async ({ page }) => {
    await open(page, "/result/Rosé");
    await expect(page.locator("h1").first()).toHaveText("Rosé");
    await expect(page.getByText("미국에서 태어난")).toHaveCount(0);
  });

  test("그래프는 저장 이미지 영역 밖에 있고 페이지가 가볍다", async ({
    page,
  }) => {
    const response = await open(page, "/result/Anne");
    const html = await response!.text();
    expect(html.length).toBeLessThan(80_000);
    await expect(page.locator("#resultPage section")).toHaveCount(0);
  });
});
