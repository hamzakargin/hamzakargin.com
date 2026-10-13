import { expect, test } from "@playwright/test";

test("command menu opens with the keyboard and filters", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard shortcut is desktop only");
  await page.goto("/");
  await page.keyboard.press("ControlOrMeta+k");

  const dialog = page.getByRole("dialog", { name: "Search" });
  const input = dialog.getByRole("combobox");
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();

  await input.fill("zustand");
  await expect(dialog.getByRole("option", { name: "State Management With Zustand" })).toBeVisible();
  await expect(dialog.getByRole("option", { name: "Home" })).toBeHidden();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("full-text search finds post content", async ({ page }) => {
  await page.goto("/blog");
  await page.getByRole("button", { name: "Search" }).filter({ visible: true }).click();

  const dialog = page.getByRole("dialog", { name: "Search" });
  await dialog.getByRole("combobox").fill("aggregation");
  const result = dialog.getByRole("group", { name: "Results" }).getByRole("option").first();
  await expect(result).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/blog\/aggregation-pipeline$/);
});

test("command menu switches theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search" }).filter({ visible: true }).click();
  await page.getByRole("dialog").getByRole("option", { name: "Dark" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("radio", { name: "Dark" })).toHaveAttribute("aria-checked", "true");
});
