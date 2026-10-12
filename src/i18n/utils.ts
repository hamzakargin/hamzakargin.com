import { defaultLocale, locales, ui, type Locale, type UiKey } from "@/i18n/ui";

function toLocale(value: string | undefined): Locale {
  return locales.find((locale) => locale === value) ?? defaultLocale;
}

export function getLocale(astro: { currentLocale?: string }) {
  return toLocale(astro.currentLocale);
}

export function useTranslations(locale: Locale) {
  return (key: UiKey, values: Record<string, string | number> = {}) => {
    const text = ui[locale][key] ?? ui[defaultLocale][key] ?? key;
    return text.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? ""));
  };
}

export function localizePath(path: string, locale: Locale) {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return path.startsWith("/#") ? `/${locale}${path.slice(1)}` : `/${locale}${path}`;
}

export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  const prefixed = locales.some((locale) => locale !== defaultLocale && locale === first);
  return prefixed ? `/${rest.join("/")}` : pathname;
}

export function cleanPath(url: URL) {
  return url.pathname.replace(/(\/index)?\.html$/, "") || "/";
}

export function pick(value: { en: string } & Partial<Record<Locale, string>>, locale: Locale) {
  return value[locale] ?? value.en;
}
