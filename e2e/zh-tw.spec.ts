import { test, expect, open, authHeaders } from "./fixtures";

test.describe("대만판 (zh-tw)", () => {
  test("홈은 번체 중국어로 나오고 예시를 누르면 결과로 간다", async ({ page }) => {
    await open(page, "/zh-tw");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hant-TW");
    await expect(page.locator("header")).toContainText("你的英文名字在美國是幾年代？");
    await page.getByRole("region", { name: "例如" }).getByRole("link", { name: /Jennifer/ }).click();
    await page.waitForURL(/\/zh-tw\/name\/Jennifer$/);
  });

  test("영어 이름을 검색하면 미국 연대와 같은 시대 대만 이름이 나온다", async ({ page }) => {
    await open(page, "/zh-tw");
    await page.getByRole("textbox").fill("Jennifer");
    await page.locator("li", { hasText: /^Jennifer$/ }).click();
    await page.waitForURL(/\/zh-tw\/name\/Jennifer$/);
    await expect(page.getByRole("heading", { name: "Jennifer", exact: true })).toBeVisible();
    await expect(page.getByText("就像台灣的", { exact: true })).toBeVisible();
    await expect(page.getByText(/^(淑芬|雅惠|淑娟)$/).first()).toBeVisible();
    await expect(page.getByText("1971–1980 年出生的台灣女生最常見的名字之一", { exact: false })).toBeVisible();
    await expect(page.getByRole("region", { name: "1971–1980 年台灣常見名字" })).toContainText("淑芬");
    await expect(page.getByRole("heading", { name: /在美國出生的 Jennifer/ })).toBeVisible();
  });

  test("남자 이름은 대만 남자 이름과 짝짓는다", async ({ page }) => {
    await open(page, "/zh-tw/name/Kevin");
    await expect(page.getByRole("region", { name: /年台灣常見名字/ })).toBeVisible();
    await expect(page.getByText("台灣男生最常見的名字之一", { exact: false })).toBeVisible();
  });

  test("없는 이름은 색인하지 않는다", async ({ page }) => {
    await open(page, "/zh-tw/name/Zzzq");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  });

  test("한국어 결과와 대만판 결과가 hreflang 으로 이어진다", async ({ page }) => {
    await open(page, "/result/Anne");
    await expect(page.locator('link[rel="alternate"][hreflang="zh-Hant-TW"]')).toHaveAttribute(
      "href",
      "https://chunja.vercel.app/zh-tw/name/Anne"
    );
    await open(page, "/zh-tw/name/Anne");
    await expect(page.locator('link[rel="alternate"][hreflang="ko"]')).toHaveAttribute(
      "href",
      "https://chunja.vercel.app/result/Anne"
    );
  });

  test("sitemap 에 대만판 주소가 들어 있다", async ({ request }) => {
    const body = await (await request.get("/sitemap.xml", { headers: authHeaders })).text();
    expect(body).toContain("https://chunja.vercel.app/zh-tw/name/Anne");
  });
});
