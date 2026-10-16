import { test, expect, open } from "./fixtures";

test.describe("페이지 이동과 기능", () => {
  test("메인의 링크로 추천 페이지와 Top 100에 갈 수 있다", async ({ page }) => {
    await open(page, "/");
    await page.getByRole("link", { name: /NEW : 영어 이름 추천/ }).click();
    await page.waitForURL(/\/your-english-name$/);
    await page.getByRole("link", { name: /메인으로 돌아가기/ }).click();
    await page.waitForURL((url) => url.pathname === "/");
    await page
      .getByRole("link", { name: /2025 미국 아기이름 트렌드 Top 100/ })
      .click();
    await page.waitForURL(/\/top-baby-names-2025$/);
  });

  test("헤더 메뉴로 Top 100에 가고 이름을 누르면 결과로 간다", async ({
    page,
  }) => {
    await open(page, "/");
    await page.locator("header button").first().click();
    await page
      .getByRole("button", { name: /2025 미국 아기이름 Top 100/ })
      .click();
    await page.waitForURL(/\/top-baby-names-2025$/);
    await page.getByRole("link", { name: /Noah/ }).first().click();
    await page.waitForURL(/\/result\/Noah$/);
  });

  test("검색 결과를 이미지로 저장할 수 있다", async ({ page }) => {
    await open(page, "/result/Anne");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "결과 저장하기" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe("Anne-result.png");
  });

  test("감사 인사 팝업과 제보 팝업이 열린다", async ({ page }) => {
    await open(page, "/");
    await page.getByText("여러분께 감사 인사 드립니다").click();
    await expect(page.getByText("춘자 사이트를 사랑해주시는 여러분")).toBeVisible();

    await open(page, "/result/Zzzq");
    await page.getByText("등재 요청").click();
    await expect(page.getByText("이름 제보하기!")).toBeVisible();
  });
});
