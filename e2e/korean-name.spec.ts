import { test, expect, open, authHeaders } from "./fixtures";

test.describe("외국인용 한국 이름 (Korean name)", () => {
  test("영어 이름을 검색하면 한국 이름 결과로 간다", async ({ page }) => {
    await open(page, "/korean-name");
    await expect(page.locator('[lang="en"]').first()).toBeVisible();
    await expect(page.locator("header")).toContainText(
      "Your generation's Korean name"
    );
    await page.getByRole("textbox").fill("Anne");
    await page.locator("li", { hasText: /^Anne$/ }).click();
    await page.waitForURL(/\/korean-name\/Anne$/);
    await expect(page.getByRole("heading", { name: "Anne" })).toBeVisible();
    await expect(page.getByText("춘자", { exact: true })).toBeVisible();
    await expect(page.getByText("Chun-ja", { exact: true })).toBeVisible();
    await expect(page.getByText("BOOMER name ✌️")).toBeVisible();
  });

  test("홈의 이름카드 예시를 누르면 결과로 간다", async ({ page }) => {
    await open(page, "/korean-name");
    const examples = page.getByRole("region", { name: "For example" });
    await expect(examples).toContainText("Chun-ja");
    await examples.getByRole("link", { name: /Anne/ }).click();
    await page.waitForURL(/\/korean-name\/Anne$/);
  });

  test("이름 확인 페이지 헤더는 할머니 이름 질문을 보여준다", async ({ page }) => {
    await open(page, "/korean-name/check");
    await expect(page.locator("header")).toContainText(
      "How does my bias's name feel?"
    );
  });

  test("영어가 아닌 글자를 넣으면 안내 문구가 나온다", async ({ page }) => {
    await open(page, "/korean-name");
    await page.getByRole("textbox").fill("안나");
    await expect(
      page.getByText("Please type your name in English letters only.")
    ).toBeVisible();
  });

  test("태어난 해를 고르면 그해 한국 인기 이름이 나온다", async ({ page }) => {
    await open(page, "/korean-name/Anne");
    const born = page.getByRole("region", { name: "Born in Korea? 🇰🇷" });
    await born.getByRole("combobox").selectOption("1988");
    await expect(born).toContainText("지혜");
    await born.getByRole("button", { name: "Boy" }).click();
    await expect(born).toContainText("지훈");
    await born.getByRole("combobox").selectOption("1990");
    await expect(born).toContainText("closest one: 1988");
    await born.getByRole("link", { name: /See all popular names in 1988/ }).click();
    await page.waitForURL(/\/korean-name\/born\/1988$/);
  });

  test("연도 페이지는 Top 3, Top 10과 출처를 보여준다", async ({ page }) => {
    await open(page, "/korean-name/born/2025");
    await expect(page.locator("h1")).toContainText(
      "Popular Korean names in 2025."
    );
    const podium = page.getByRole("region", { name: "Top 3" });
    await expect(podium).toContainText("도윤");
    await expect(podium).toContainText("서아");
    await expect(page.getByText(/Supreme Court of Korea/)).toBeVisible();
    await page.getByRole("link", { name: "‹ 2024" }).click();
    await page.waitForURL(/\/korean-name\/born\/2024$/);
  });

  test("연도 목록에서 태어난 해를 입력하면 가장 가까운 연도로 간다", async ({
    page,
  }) => {
    await open(page, "/korean-name/born");
    await page.getByLabel("When were you born?").fill("1990");
    await page.getByRole("button", { name: "Show me" }).click();
    await page.waitForURL(/\/korean-name\/born\/1988$/);
  });

  test("한국 이름을 로마자로 넣으면 유행 시기를 알려준다", async ({ page }) => {
    await open(page, "/korean-name/check");
    await page.getByRole("textbox").fill("Minjoon");
    await page.getByRole("button", { name: "Check" }).click();
    await page.waitForURL(/\/korean-name\/check\/minjun$/);
    await expect(page.getByRole("heading", { name: "Min-jun", exact: true })).toBeVisible();
    await expect(page.getByText("민준", { exact: true })).toBeVisible();
    await expect(page.getByText(/#1 name for Korean boys/)).toBeVisible();
  });

  test("옛날 한국 이름은 부머 세대 이름으로 나온다", async ({ page }) => {
    await open(page, "/korean-name/check/yeongja");
    await expect(page.getByText("BOOMER name ✌️")).toBeVisible();
  });

  test("없는 이름은 색인하지 않는다", async ({ page }) => {
    await open(page, "/korean-name/Zzzq");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow"
    );
    await open(page, "/korean-name/check/zzzq");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow"
    );
  });

  test("결과 페이지마다 영어 공유 이미지가 생성된다", async ({
    page,
    request,
  }) => {
    await open(page, "/korean-name/Anne");
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute(
      "content",
      /\/korean-name\/Anne\/opengraph-image/
    );
    const url = await ogImage.getAttribute("content");
    const response = await request.get(new URL(url!).pathname, {
      headers: authHeaders,
    });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("sitemap에 한국 이름 페이지가 들어 있다", async ({ request }) => {
    const response = await request.get("/sitemap.xml", { headers: authHeaders });
    const body = await response.text();
    expect(body).toContain("https://chunja.vercel.app/korean-name/Anne");
    expect(body).toContain("https://chunja.vercel.app/korean-name/born/1988");
    expect(body).toContain("https://chunja.vercel.app/korean-name/check/minjun");
  });

  test("한국어 헤더 메뉴에서 영어 페이지로 갈 수 있다", async ({ page }) => {
    await open(page, "/");
    await page.locator("header button").first().click();
    await page.getByRole("button", { name: /What's my Korean name\?/ }).click();
    await page.waitForURL(/\/korean-name$/);
    await page.locator("header button").first().click();
    await page.getByRole("button", { name: /한국어 사이트/ }).click();
    await page.waitForURL((url) => url.pathname === "/");
  });

  test("뒤로가기 버튼은 이전 화면으로, 처음 들어온 화면에서는 홈으로 간다", async ({
    page,
  }) => {
    await open(page, "/korean-name/born/1988");
    await page.getByRole("link", { name: "‹ 1978" }).click();
    await page.waitForURL(/\/korean-name\/born\/1978$/);
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await page.waitForURL(/\/korean-name\/born\/1988$/);

    await open(page, "/korean-name/check/jimin");
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await page.waitForURL(/\/korean-name$/);
    await expect(page.getByRole("button", { name: "Back", exact: true })).toHaveCount(0);
  });

  test("상위 10위 밖 이름도 연도별 그래프와 세대를 보여준다", async ({
    page,
  }) => {
    await open(page, "/korean-name/check/yunseul");
    await expect(page.getByRole("heading", { name: "Yun-seul", exact: true })).toBeVisible();
    await expect(page.getByText("GEN ALPHA name 👶")).toBeVisible();
    const trend = page.getByRole("region", {
      name: "📈 Korean babies named Yun-seul",
    });
    await expect(trend.getByRole("img")).toBeVisible();
    await expect(trend).toContainText("at least");
  });

  test("같은 이름을 가진 가수, 배우를 본명으로 보여준다", async ({ page }) => {
    await open(page, "/korean-name/check/taehyeong");
    const famous = page.getByRole("region", {
      name: "⭐ Famous Koreans named Tae-hyeong",
    });
    await expect(famous).toContainText("Kim Tae-hyeong (김태형)");
    await expect(famous).toContainText("BTS");
    await expect(famous.getByText(/^V$/)).toHaveCount(0);
  });

  test("소속이 빠진 멤버는 보정 파일로 고친 그룹을 보여준다", async ({ page }) => {
    await open(page, "/korean-name/check/jimin");
    const famous = page.getByRole("region", {
      name: "⭐ Famous Koreans named Ji-min",
    });
    await expect(famous.getByRole("listitem").filter({ hasText: "Yoo Ji-min" })).toContainText("aespa");
    await open(page, "/korean-name/check/nayeon");
    await expect(page.getByText("Lim Na-yeon (임나연)")).toBeVisible();
    await expect(page.getByText(/TWICE/).first()).toBeVisible();
  });

  test("2000년 이전은 10년 단위 버튼 하나로 보여준다", async ({ page }) => {
    await open(page, "/korean-name/born");
    await expect(page.getByRole("link", { name: "1998", exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "2008", exact: true })).toBeVisible();
    await page.getByRole("link", { name: "See popular names (1995 data) →" }).click();
    await page.waitForURL(/\/korean-name\/born\/1995$/);
  });

  test("연도 페이지 Top 3 이름을 누르면 이름카드 페이지로 간다", async ({ page }) => {
    await open(page, "/korean-name/born/2025");
    await page
      .getByRole("region", { name: "Top 3" })
      .getByRole("link", { name: /도윤/ })
      .click();
    await page.waitForURL(/\/korean-name\/check\/doyun$/);
    await expect(page.getByRole("heading", { name: "Do-yun", exact: true })).toBeVisible();
  });
});
