export function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function formatNumericMonth(date: Date) {
  return `${String(date.getUTCMonth() + 1).padStart(2, "0")}.${date.getUTCFullYear()}`;
}

export function formatRange(start: Date, end?: Date) {
  return `${formatNumericMonth(start)}–${end ? formatNumericMonth(end) : "∞"}`;
}

export function formatDuration(start: Date, end = new Date()) {
  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years}y`, rest && `${rest}m`].filter(Boolean).join(" ");
}
