import { test, expect, open } from "./fixtures";

const jsonLdTypes = async (page: import("@playwright/test").Page) =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).map(
    (text) => JSON.parse(text)["@type"]
  );

test.describe("SEO 리뉴얼", () => {
  test("한국어 페이지는 lang=ko, 영어 페이지는 lang=en 이다", async ({ page }) => {
    await open(page, "/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await open(page, "/korean-name/Anne");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("홈은 canonical 과 검색어가 들어간 제목을 가진다", async ({ page }) => {
    await open(page, "/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://chunja.vercel.app"
    );
    await expect(page).toHaveTitle(/미국에선 몇 년생 느낌/);
  });

  test("결과 페이지에 사이트와 경로 구조화 데이터가 있다", async ({ page }) => {
    await open(page, "/result/Anne");
    expect(await jsonLdTypes(page)).toEqual(
      expect.arrayContaining(["WebSite", "BreadcrumbList"])
    );
    await open(page, "/korean-name/born/1988");
    expect(await jsonLdTypes(page)).toEqual(
      expect.arrayContaining(["WebSite", "BreadcrumbList", "ItemList"])
    );
  });

  test("한국어 결과 페이지에 같은 시기 이름 링크가 있다", async ({ page }) => {
    await open(page, "/result/Anne");
    const related = page.getByRole("region", { name: "같은 시기에 유행한 영어 이름" });
    await expect(related.getByRole("link")).toHaveCount(6);
    await related.getByRole("link").first().click();
    await page.waitForURL(/\/result\/(?!Anne$)[^/]+$/);
  });

  test("영어 결과와 이름 확인 페이지에 관련 이름 링크가 있다", async ({ page }) => {
    await open(page, "/korean-name/Anne");
    await expect(
      page
        .getByRole("region", { name: "More English names from the same generation" })
        .getByRole("link")
    ).toHaveCount(6);
    await open(page, "/korean-name/check/jimin");
    await expect(
      page.getByRole("region", { name: /Other popular Korean names around/ }).getByRole("link")
    ).toHaveCount(6);
  });

  test("푸터로 한국어와 영어 사이트를 오갈 수 있다", async ({ page }) => {
    await open(page, "/year/1995");
    await page.locator("footer").getByRole("link", { name: /English/ }).click();
    await page.waitForURL(/\/korean-name$/);
    await page.locator("footer").getByRole("link", { name: /한국어/ }).click();
    await page.waitForURL((url) => url.pathname === "/");
  });
});
