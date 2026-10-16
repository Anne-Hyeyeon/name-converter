import { test, expect, open, authHeaders } from "./fixtures";

test.describe("SEO와 광고", () => {
  test("sitemap.xml에 이름 결과 페이지가 모두 들어 있다", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml", {
      headers: authHeaders,
    });
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("https://chunja.vercel.app/result/Anne");
    expect((body.match(/<loc>/g) ?? []).length).toBeGreaterThan(4900);
  });

  test("robots.txt가 sitemap을 알려주고 막는 경로가 없다", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt", {
      headers: authHeaders,
    });
    const body = await response.text();
    expect(body).toContain("Sitemap: https://chunja.vercel.app/sitemap.xml");
    expect(body).not.toMatch(/Disallow:\s*\/\S/);
  });

  test("ads.txt가 응답한다", async ({ request }) => {
    const response = await request.get("/ads.txt", { headers: authHeaders });
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("pub-9957097846867956");
  });

  test("없는 이름 페이지는 색인되지 않고 일반 결과는 색인된다", async ({
    page,
  }) => {
    await open(page, "/result/Zzzq");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow"
    );
    await open(page, "/result/Anne");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("결과 페이지마다 공유 이미지가 생성된다", async ({ page, request }) => {
    await open(page, "/result/Anne");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/result\/Anne\/opengraph-image/
    );
    const image = await request.get("/result/Anne/opengraph-image", {
      headers: authHeaders,
    });
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toBe("image/png");
  });

  test("모든 페이지에서 AdSense와 GA 스크립트를 불러온다", async ({ page }) => {
    for (const path of ["/", "/your-english-name", "/result/Anne"]) {
      const adsense = page.waitForRequest((request) =>
        request
          .url()
          .includes("adsbygoogle.js?client=ca-pub-9957097846867956")
      );
      const gtag = page.waitForRequest((request) =>
        request.url().includes("googletagmanager.com/gtag/js?id=G-M1E6F65P9K")
      );
      await open(page, path);
      await Promise.all([adsense, gtag]);
    }
  });

  test("검색과 추천 동작이 GA 이벤트로 전송된다", async ({ page }) => {
    const events = () =>
      page.evaluate(() =>
        ((window as unknown as { dataLayer?: unknown[][] }).dataLayer ?? [])
          .filter((entry) => entry[0] === "event")
          .map((entry) => String(entry[1]))
      );

    await open(page, "/");
    await page.waitForFunction(
      () => typeof (window as unknown as { gtag?: unknown }).gtag === "function"
    );
    await page.fill("input", "Anne");
    await page.locator("li", { hasText: /^Anne$/ }).click();
    await page.waitForURL(/\/result\/Anne$/);
    expect(await events()).toContain("search_name");
  });
});
