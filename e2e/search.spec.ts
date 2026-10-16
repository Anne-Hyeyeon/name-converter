import { test, expect, open } from "./fixtures";

test.describe("이름 검색", () => {
  test("메인 HTML에 이름 상세 데이터가 들어가지 않는다", async ({ page }) => {
    const response = await open(page, "/");
    const html = await response!.text();
    expect(html).not.toContain("koreanName");
  });

  test("자동완성에서 이름을 골라 결과 페이지로 이동한다", async ({ page }) => {
    await open(page, "/");
    await page.fill("input", "Anne");
    await page.locator("li", { hasText: /^Anne$/ }).click();
    await page.waitForURL(/\/result\/Anne$/);
    await expect(page.locator("h1").first()).toHaveText("Anne");
    await expect(page.getByText("미국에서")).toBeVisible();
  });

  test("10자가 넘는 이름도 검색된다", async ({ page }) => {
    await open(page, "/");
    await page.fill("input", "Christopher");
    await expect(page.locator("li", { hasText: /^Christopher$/ })).toBeVisible();
  });

  test("20자를 넘으면 길이 안내가 나온다", async ({ page }) => {
    await open(page, "/");
    await page.fill("input", "Abcdefghijklmnopqrstu");
    await expect(page.getByText("이름이 너무 길어요")).toBeVisible();
  });

  test("악센트 없이 입력해도 악센트 이름이 나온다", async ({ page }) => {
    await open(page, "/");
    await page.fill("input", "rose");
    await page.locator("li", { hasText: /^Rosé$/ }).click();
    await page.waitForURL(/\/result\/Ros/);
    await expect(page.locator("h1").first()).toHaveText("Rosé");
  });

  test("중복 이름은 자동완성에 한 번만 나온다", async ({ page }) => {
    await open(page, "/");
    await page.fill("input", "Hayden");
    await expect(page.locator("li", { hasText: /^Hayden$/ })).toHaveCount(1);
  });

  test("없는 이름은 안내 페이지와 비슷한 이름을 보여준다", async ({ page }) => {
    await open(page, "/result/Jeniffer");
    await expect(page.getByText("정보를 찾을 수 없습니다")).toBeVisible();
    await page.getByRole("link", { name: "Jennifer", exact: true }).click();
    await page.waitForURL(/\/result\/Jennifer$/);
    await expect(page.locator("h1").first()).toHaveText("Jennifer");
  });

  test("검색창에서 없는 이름을 누르면 안내 페이지로 간다", async ({ page }) => {
    await open(page, "/");
    await page.fill("input", "Zzzq");
    await page.locator("li", { hasText: "없다고요" }).click();
    await page.waitForURL(/\/result\/Zzzq$/);
    await expect(page.getByText("정보를 찾을 수 없습니다")).toBeVisible();
  });

  test("대소문자가 달라도 결과를 보여주고 canonical은 정식 이름이다", async ({
    page,
  }) => {
    const response = await open(page, "/result/anne");
    expect(response!.status()).toBe(200);
    await expect(page.locator("h1").first()).toHaveText("Anne");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/result\/Anne$/
    );
  });
});
