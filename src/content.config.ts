import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const localized = z.object({
  en: z.string(),
  ru: z.string().optional(),
  tr: z.string().optional(),
  de: z.string().optional(),
});

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
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image().optional(),
      description: localized,
      homepage: z.url().optional(),
      github: z.url().optional(),
      techstack: z.array(z.string()).default([]),
      dateCreated: z.coerce.date(),
      featured: z.boolean().default(false),
    }),
});

const log = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/log" }),
  schema: z.object({
    date: z.coerce.date(),
    label: z.enum(["ship", "oss"]),
    title: localized,
    link: z.url().optional(),
  }),
});

const experience = defineCollection({
  loader: file("./src/content/experience.yaml"),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    type: localized,
    location: localized,
    mode: localized,
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    highlights: z.array(localized).default([]),
    skills: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: file("./src/content/education.yaml"),
  schema: z.object({
    school: localized,
    degree: localized,
    field: localized,
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    skills: z.array(z.string()).default([]),
  }),
});

const certifications = defineCollection({
  loader: file("./src/content/certifications.yaml"),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.coerce.date(),
    url: z.url().optional(),
    icon: z.string().optional(),
  }),
});

const stack = defineCollection({
  loader: file("./src/content/stack.yaml"),
  schema: z.object({
    name: z.string(),
    items: z.array(z.string()),
  }),
});

export const collections = {
  blog,
  projects,
  log,
  experience,
  education,
  certifications,
  stack,
};
