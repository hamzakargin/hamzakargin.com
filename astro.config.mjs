import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hamzakargin.com",
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "tr", "de"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    expressiveCode({
      themes: ["github-dark", "github-light"],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => (theme.type === "dark" ? ".dark" : ":root:not(.dark)"),
      styleOverrides: {
        borderRadius: "0.5rem",
        borderColor: "var(--border)",
        codeFontSize: "0.8125rem",
        codeFontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        uiFontFamily: "'Geist Variable', sans-serif",
        frames: {
          shadowColor: "transparent",
          frameBoxShadowCssValue: "none",
        },
      },
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", ru: "ru", tr: "tr", de: "de" },
      },
      filter: (page) => !/^(\/(ru|tr|de))?\/(404$|blog\/.+)/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
