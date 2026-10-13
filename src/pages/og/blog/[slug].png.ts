import type { APIRoute, GetStaticPaths } from "astro";
import type { CollectionEntry } from "astro:content";
import { getPosts } from "@/lib/blog";
import { renderOg } from "@/lib/og";

export const getStaticPaths = (async () =>
  (await getPosts()).map((post) => ({
    params: { slug: post.id },
    props: { post },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: CollectionEntry<"blog"> }> = async ({ props }) =>
  new Response(
    new Uint8Array(
      await renderOg({ title: props.post.data.title, subtitle: props.post.data.summary }),
    ),
    {
      headers: { "Content-Type": "image/png" },
    },
  );
