import { expect, test } from "@playwright/test";

const locales = ["en", "ru", "tr", "de"] as const;
const paths = ["/", "/about", "/blog", "/log", "/blog/tanstack"];
const prefix = (locale: string) => (locale === "en" ? "" : `/${locale}`);

for (const locale of locales) {
  for (const path of paths) {
    if (locale !== "en" && path.startsWith("/blog/")) continue;
    const url = `${prefix(locale)}${path === "/" ? "" : path}` || "/";

    test(`${url} renders`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Hamza Kargin/);
    });
  }
}

test("unknown pages show the 404 page", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Page not found");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
});

test("internal links resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const locale of locales) {
    await page.goto(prefix(locale) || "/");
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).pathname));
    for (const href of hrefs) seen.add(href);
  }
  for (const href of seen) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});
