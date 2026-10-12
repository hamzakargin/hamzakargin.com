import { defaultLocale, intlLocales, type Locale } from "@/i18n/ui";

export function formatMonth(date: Date, locale: Locale = defaultLocale) {
  return date
    .toLocaleDateString(intlLocales[locale], { month: "short", year: "numeric", timeZone: "UTC" })
    .replace(/\s*г\.$/, "");
}

const durationUnits: Record<Locale, { year: string; month: string }> = {
  en: { year: "y", month: "m" },
  ru: { year: " г.", month: " мес." },
  tr: { year: " yıl", month: " ay" },
  de: { year: " J.", month: " Mon." },
};

function formatNumericMonth(date: Date) {
  return `${String(date.getUTCMonth() + 1).padStart(2, "0")}.${date.getUTCFullYear()}`;
}

export function formatRange(start: Date, end?: Date) {
  return `${formatNumericMonth(start)}–${end ? formatNumericMonth(end) : "∞"}`;
}

export function formatDuration(start: Date, end = new Date(), locale: Locale = defaultLocale) {
  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const units = durationUnits[locale];
  return [years && `${years}${units.year}`, rest && `${rest}${units.month}`]
    .filter(Boolean)
    .join(" ");
}

export function formatDate(date: Date, locale: Locale = defaultLocale) {
  return date.toLocaleDateString(intlLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
