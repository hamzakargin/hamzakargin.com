import { describe, expect, test } from "vitest";
import { defaultLocale, locales, ui } from "@/i18n/ui";
import { cleanPath, localizePath, stripLocale } from "@/i18n/utils";

const english = ui[defaultLocale];
const placeholders = (text = "") =>
  [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).toSorted();

describe.each(locales.filter((locale) => locale !== defaultLocale))("%s translations", (locale) => {
  const translations = ui[locale];

  test("cover every english key", () => {
    const missing = Object.keys(english).filter(
      (key) => typeof translations[key as keyof typeof english] !== "string",
    );
    expect(missing).toEqual([]);
  });

  test("have no unknown keys", () => {
    const unknown = Object.keys(translations).filter((key) => !(key in english));
    expect(unknown).toEqual([]);
  });

  test("keep the same placeholders", () => {
    for (const [key, text] of Object.entries(english)) {
      expect(placeholders(translations[key as keyof typeof english]), key).toEqual(
        placeholders(text),
      );
    }
  });
});

describe("localizePath", () => {
  test.each([
    ["/", "en", "/"],
    ["/about", "en", "/about"],
    ["/", "ru", "/ru"],
    ["/about", "tr", "/tr/about"],
    ["/#work", "de", "/de#work"],
  ] as const)("%s in %s is %s", (path, locale, expected) => {
    expect(localizePath(path, locale)).toBe(expected);
  });
});

describe("stripLocale", () => {
  test.each([
    ["/ru/about", "/about"],
    ["/de", "/"],
    ["/about", "/about"],
    ["/rust", "/rust"],
  ])("%s becomes %s", (path, expected) => {
    expect(stripLocale(path)).toBe(expected);
  });
});

describe("cleanPath", () => {
  test.each([
    ["https://hamzakargin.com/index.html", "/"],
    ["https://hamzakargin.com/about.html", "/about"],
    ["https://hamzakargin.com/ru/index.html", "/ru"],
    ["https://hamzakargin.com/log", "/log"],
  ])("%s becomes %s", (url, expected) => {
    expect(cleanPath(new URL(url))).toBe(expected);
  });
});
