import { test, expect, open, authHeaders } from "./fixtures";

test.describe("결과 공유", () => {
  test("결과 페이지에 카톡 공유와 링크 복사 버튼이 있다", async ({ page }) => {
    await open(page, "/result/Olivia");
    await expect(
      page.getByRole("button", { name: "카카오톡으로 공유하기" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "링크 복사하기" })
    ).toBeVisible();
  });

  test("링크 복사를 누르면 결과 주소가 복사된다", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await open(page, "/result/Olivia");
    await page.getByRole("button", { name: "링크 복사하기" }).click();
    await expect(
      page.getByRole("button", { name: "링크를 복사했어요 ✓" })
    ).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe("https://chunja.vercel.app/result/Olivia");
  });

  test("카톡 카드 이미지가 PNG로 나온다", async ({ request }) => {
    const response = await request.get("/kakao-card/Olivia", {
      headers: authHeaders,
    });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});
