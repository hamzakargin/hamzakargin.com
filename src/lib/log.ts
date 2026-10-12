import { getCollection } from "astro:content";

export async function getLogEntries() {
  const entries = await getCollection("log");
  return entries.toSorted((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatLogDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
