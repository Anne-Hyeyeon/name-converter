import { test, expect, open, authHeaders } from "./fixtures";

test.describe("연도별 인기 이름", () => {
  test("메인에서 연도 목록으로 가서 연도를 고를 수 있다", async ({ page }) => {
    await open(page, "/");
    await page
      .getByRole("link", { name: /내가 태어난 해 미국 인기 이름/ })
      .click();
    await page.waitForURL(/\/year$/);
    await expect(
      page.getByRole("link", { name: "1880", exact: true })
    ).toBeVisible();
    await page.getByRole("link", { name: "1995", exact: true }).click();
    await page.waitForURL(/\/year\/1995$/);
    await expect(page.locator("h1")).toContainText("1995년 미국에서");
  });

  test("Top 3와 Top 50을 보여주고 이름을 누르면 결과로 간다", async ({
    page,
  }) => {
    await open(page, "/year/1995");
    const podium = page.getByRole("region", { name: "Top 3" });
    await expect(podium).toContainText("Michael");
    await expect(podium).toContainText("Jessica");
    await expect(page.locator("ul li").filter({ hasText: /^50/ })).toHaveCount(
      1
    );
    await podium.getByRole("link", { name: /Jessica/ }).click();
    await page.waitForURL(/\/result\/Jessica$/);
  });

  test("이전, 다음 연도로 이동할 수 있다", async ({ page }) => {
    await open(page, "/year/1995");
    await page.getByRole("link", { name: "1996 →" }).click();
    await page.waitForURL(/\/year\/1996$/);
    await page.getByRole("link", { name: "← 1995" }).click();
    await page.waitForURL(/\/year\/1995$/);

    await open(page, "/year/1880");
    await expect(page.getByRole("link", { name: /← 1879/ })).toHaveCount(0);
  });

  test("없는 연도는 404다", async ({ request }) => {
    const response = await request.get("/year/1879", { headers: authHeaders });
    expect(response.status()).toBe(404);
  });

  test("결과 페이지 그래프의 정점 연도에서 연도 페이지로 간다", async ({
    page,
  }) => {
    await open(page, "/result/Anne");
    await page.getByRole("link", { name: "1959년" }).click();
    await page.waitForURL(/\/year\/1959$/);
  });

  test("sitemap에 연도 페이지가 들어 있다", async ({ request }) => {
    const body = await (
      await request.get("/sitemap.xml", { headers: authHeaders })
    ).text();
    expect(body).toContain("https://chunja.vercel.app/year/1995");
    expect(body).toContain("https://chunja.vercel.app/year</loc>");
  });
});
