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

  test("이름 그래프 공지를 열고 예시 그래프로 이동한다", async ({ page }) => {
    await open(page, "/");
    await page.getByText("신규 기능 : 이름 그래프가 생겼어요!").click();
    await expect(
      page.getByRole("heading", { name: /이름 그래프가 생겼어요!/ })
    ).toBeVisible();
    await page.getByRole("link", { name: /Anne 그래프 먼저 보기/ }).click();
    await page.waitForURL(/\/result\/Anne$/);
    await expect(page.getByText("미국에서 태어난 Anne")).toBeVisible();
  });

  test("감사 인사 팝업과 제보 팝업이 열린다", async ({ page }) => {
    await open(page, "/");
    await page.getByText("여러분께 감사 인사 드립니다").click();
    await expect(page.getByText("춘자 사이트를 사랑해주시는 여러분")).toBeVisible();

    await open(page, "/result/Zzzq");
    await page.getByText("등재 요청").click();
    await expect(page.getByText("이름 제보하기!")).toBeVisible();
  });

  test("팝업과 헤더 메뉴는 Esc 키로 닫힌다", async ({ page }) => {
    await open(page, "/");
    await page.getByRole("button", { name: /여러분께 감사 인사 드립니다/ }).click();
    const notice = page.getByRole("dialog", { name: /춘자 사이트를 사랑해주시는/ });
    await expect(notice).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(notice).toBeHidden();

    const menuButton = page.getByRole("button", { name: "메뉴" });
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await open(page, "/result/Zzzq");
    await page.getByRole("button", { name: "등재 요청" }).click();
    const report = page.getByRole("dialog", { name: /이름 제보하기/ });
    await expect(report).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(report).toBeHidden();
  });

  test("한국 이름 결과도 이미지로 저장할 수 있다", async ({ page }) => {
    await open(page, "/korean-name/Anne");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Save image" }).click(),
    ]);
    expect(download.suggestedFilename()).toBe("Anne-korean-name.png");
  });

  test("긴 페이지는 창 전체가 스크롤되고 헤더는 위에 남는다", async ({
    page,
  }) => {
    await open(page, "/result/Anne");
    const main = page.locator("main");
    expect(
      await main.evaluate((el) => el.scrollHeight - el.clientHeight)
    ).toBe(0);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    const headerTop = await page
      .locator("header")
      .evaluate((el) => el.getBoundingClientRect().top);
    expect(headerTop).toBe(0);
    await expect(page.locator("footer")).toBeInViewport();
  });

  test("없는 주소는 사이트 모양의 404 페이지를 보여준다", async ({ page }) => {
    const response = await open(page, "/no-such-page");
    expect(response!.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await expect(page.getByText("페이지를 찾을 수 없어요.")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await page.getByRole("link", { name: "검색창으로 돌아가기" }).click();
    await page.waitForURL((url) => url.pathname === "/");
  });
});
