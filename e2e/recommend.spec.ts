import { test, expect, open } from "./fixtures";

const RECOMMEND_QUERY =
  "gender=female&generation=4&characteristics=3&koreanName=%ED%98%9C%EC%97%B0";

test.describe("이름 추천", () => {
  test("추천 페이지 HTML에 이름 상세 데이터가 들어가지 않는다", async ({
    page,
  }) => {
    const response = await open(page, "/your-english-name");
    const html = await response!.text();
    expect(html).not.toContain("koreanName");
  });

  test("조건을 고르면 추천을 받고 다시 추천받을 수 있다", async ({ page }) => {
    await open(page, "/your-english-name");
    await page.getByRole("button", { name: /이름 추천 시작하기/ }).click();
    await page.fill('input[type="text"]', "혜연");
    await page.getByRole("button", { name: /여성/ }).click();
    await page.getByRole("button", { name: /Millennials/ }).click();
    await page.locator("label", { hasText: "밝은" }).click();
    await page.locator("label", { hasText: "사랑스러운" }).click();
    await page.getByRole("button", { name: /이름 추천 받기/ }).click();

    await page.waitForURL(/\/recommend\/[^/?]+\?.*koreanName=/);
    await expect(
      page.getByRole("heading", { name: /추천하는 영어 이름은/ })
    ).toBeVisible();
    await expect(page.getByText("혜연님")).toBeVisible();

    const firstName = await page.locator("h2").first().innerText();
    await page.getByText("한번 더 추천받기").click();
    await expect(page.locator("h2").first()).not.toHaveText(firstName);
  });

  test("예전 추천 링크는 /recommend로 이동한다", async ({ page }) => {
    await open(page, `/result/Anne?from=recommendation&${RECOMMEND_QUERY}`);
    await expect(page).toHaveURL(/\/recommend\/Anne\?/);
    await expect(page.getByText("혜연님")).toBeVisible();
  });

  test("파라미터가 깨진 추천 링크는 검색 결과로 이동한다", async ({ page }) => {
    await open(page, "/recommend/Anne?gender=x");
    await expect(page).toHaveURL(/\/result\/Anne$/);
  });

  test("추천 결과 페이지는 검색엔진에 색인되지 않는다", async ({ page }) => {
    await open(page, `/recommend/Anne?${RECOMMEND_QUERY}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow"
    );
  });
});
