import { defaultLocale, locales } from "@/i18n/ui";

export const localizedPaths = () =>
  locales.filter((locale) => locale !== defaultLocale).map((lang) => ({ params: { lang } }));
