import type { APIRoute, GetStaticPaths } from "astro";
import { locales, type Locale } from "@/i18n/ui";
import { ogPages, pageOg, renderOg, type OgPage } from "@/lib/og";

export const getStaticPaths = (() =>
  locales.flatMap((locale) =>
    ogPages.map((page) => ({ params: { slug: `${locale}-${page}` }, props: { locale, page } })),
  )) satisfies GetStaticPaths;

export const GET: APIRoute<{ locale: Locale; page: OgPage }> = async ({ props }) =>
  new Response(new Uint8Array(await renderOg(pageOg(props.page, props.locale))), {
    headers: { "Content-Type": "image/png" },
  });
