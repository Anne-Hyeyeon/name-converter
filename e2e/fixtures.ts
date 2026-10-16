import { test as base, expect, Page } from "@playwright/test";

const token = process.env.VERCEL_OIDC_TOKEN;
const waitUntil =
  process.env.WAIT_UNTIL === "load" ? "load" : ("networkidle" as const);

export const authHeaders: Record<string, string> = token
  ? { "x-vercel-trusted-oidc-idp-token": token }
  : {};

export const test = base.extend({
  context: async ({ context, baseURL }, provide) => {
    if (token && baseURL) {
      const origin = new URL(baseURL).origin;
      await context.route(
        (url) => url.origin === origin,
        (route) =>
          route.continue({
            headers: { ...route.request().headers(), ...authHeaders },
          })
      );
    }
    await provide(context);
  },
  page: async ({ page }, provide) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await provide(page);
    expect(errors, "페이지 에러").toEqual([]);
  },
});

export const open = (page: Page, path: string) =>
  page.goto(path, { waitUntil });

export { expect };
