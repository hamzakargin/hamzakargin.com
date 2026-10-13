import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";
import type { Locale, UiKey } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";
import { site } from "@/lib/site";

export const ogPages = ["home", "about", "log", "blog"] as const;
export type OgPage = (typeof ogPages)[number];

const text: Record<OgPage, [UiKey | null, UiKey]> = {
  home: [null, "hero.role"],
  about: ["about.title", "about.description"],
  log: ["log.title", "log.description"],
  blog: ["blog.title", "blog.description"],
};

export const ogImagePath = (page: OgPage, locale: Locale) => `/og/${locale}-${page}.png`;

const fontFile = (subset: string, weight: number) =>
  readFile(`node_modules/@fontsource/geist/files/geist-${subset}-${weight}-normal.woff`);

const loadFonts = async () =>
  Promise.all(
    ["latin", "latin-ext", "cyrillic"].flatMap((subset) =>
      ([400, 800] as const).map(async (weight) => ({
        name: `Geist ${subset}`,
        data: await fontFile(subset, weight),
        weight,
        style: "normal" as const,
      })),
    ),
  );

let fonts: ReturnType<typeof loadFonts> | undefined;

type Node = { type: string; props: Record<string, unknown> };

const el = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
  props = {},
): Node => ({
  type,
  props: { style, children, ...props },
});

const line = (style: Record<string, unknown>) =>
  el("div", { position: "absolute", backgroundColor: "rgba(255,255,255,0.12)", ...style });

const plus = (x: number, y: number) => [
  el("div", {
    position: "absolute",
    left: x - 10,
    top: y - 1,
    width: 20,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.45)",
  }),
  el("div", {
    position: "absolute",
    left: x - 1,
    top: y - 10,
    width: 2,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.45)",
  }),
];

export const pageOg = (page: OgPage, locale: Locale) => {
  const t = useTranslations(locale);
  const [titleKey, subtitleKey] = text[page];
  return { title: titleKey ? t(titleKey) : site.name, subtitle: t(subtitleKey) };
};

export const postOgImagePath = (id: string) => `/og/blog/${id}.png`;

export async function renderOg({ title, subtitle }: { title: string; subtitle: string }) {
  const long = title.length > 22;
  const mark = await readFile("public/favicon.svg");
  const tree = el(
    "div",
    {
      display: "flex",
      position: "relative",
      width: 1200,
      height: 630,
      backgroundColor: "#000",
      fontFamily: "Geist latin, Geist latin-ext, Geist cyrillic",
      color: "#fafafa",
    },
    [
      el("div", {
        position: "absolute",
        right: -180,
        top: -200,
        width: 640,
        height: 640,
        backgroundImage:
          "radial-gradient(circle, rgba(225,29,72,0.33), rgba(251,146,60,0.12) 40%, rgba(0,0,0,0) 70%)",
      }),
      line({ left: 60, top: 0, width: 1, height: 630 }),
      line({ right: 60, top: 0, width: 1, height: 630 }),
      line({ top: 60, left: 0, width: 1200, height: 1 }),
      line({ bottom: 60, left: 0, width: 1200, height: 1 }),
      ...plus(60, 60),
      ...plus(1140, 60),
      ...plus(60, 570),
      ...plus(1140, 570),
      el("img", { position: "absolute", left: 110, top: 105, width: 84, height: 84 }, undefined, {
        src: `data:image/svg+xml;base64,${mark.toString("base64")}`,
        width: 84,
        height: 84,
      }),
      el(
        "div",
        {
          position: "absolute",
          left: 106,
          top: long ? 225 : 240,
          width: 980,
          display: "flex",
          flexDirection: "column",
          gap: long ? 24 : 28,
        },
        [
          el(
            "div",
            {
              fontSize: long ? 64 : 92,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              lineClamp: 2,
            },
            title,
          ),
          el(
            "div",
            {
              paddingLeft: 4,
              fontSize: long ? 30 : 34,
              lineHeight: 1.35,
              color: "#a1a1aa",
              lineClamp: 2,
            },
            subtitle.replace(/\.$/, ""),
          ),
        ],
      ),
      el(
        "div",
        { position: "absolute", left: 110, bottom: 92, fontSize: 26, color: "#71717a" },
        "hamzakargin.com",
      ),
    ],
  );
  fonts ??= loadFonts();
  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await fonts,
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
