export type Theme = "system" | "light" | "dark";

const media = window.matchMedia("(prefers-color-scheme: dark)");

export function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && media.matches);
  document.documentElement.classList.toggle("dark", dark);
  document.dispatchEvent(new CustomEvent<Theme>("themechange", { detail: theme }));
}

export function setTheme(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  } catch {}
  applyTheme(theme);
}

media.addEventListener("change", () => {
  if (readTheme() === "system") applyTheme("system");
});
