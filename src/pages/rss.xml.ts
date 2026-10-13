import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { ui } from "@/i18n/ui";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const GET: APIRoute = async (context) =>
  rss({
    title: `${ui.en["blog.title"]} · ${site.name}`,
    description: ui.en["blog.description"] ?? "",
    site: context.site ?? "https://hamzakargin.com",
    items: (await getPosts()).map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/blog/${post.id}`,
    })),
    customData: "<language>en</language>",
    trailingSlash: false,
  });
