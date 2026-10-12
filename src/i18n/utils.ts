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
  return locale === defaultLocale ? path : `/${locale}${path}`;
}
