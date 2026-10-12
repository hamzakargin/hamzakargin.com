import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    modifiedTime: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    homepage: z.url().optional(),
    github: z.url().optional(),
    techstack: z.array(z.string()),
    dateCreated: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const log = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/log" }),
  schema: z.object({
    date: z.coerce.date(),
    label: z.enum(["ship", "oss"]),
    title: z.object({
      en: z.string(),
      ru: z.string().optional(),
      tr: z.string().optional(),
      de: z.string().optional(),
    }),
    link: z.url().optional(),
  }),
});

export const collections = { blog, projects, log };
