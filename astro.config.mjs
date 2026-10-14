import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://hamzakargin.com",
  trailingSlash: "never",
  build: { format: "file" },
  prefetch: { prefetchAll: true },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Caveat",
      cssVariable: "--font-caveat",
      weights: [600],
      styles: ["normal"],
      subsets: ["latin", "latin-ext", "cyrillic"],
      fallbacks: ["cursive"],
    },
  ],
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
        uiFontFamily: "var(--font-geist)",
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
      filter: (page) =>
        !/^(\/(ru|tr|de))?\/404$|^\/(ru|tr|de)\/blog\/.+/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
