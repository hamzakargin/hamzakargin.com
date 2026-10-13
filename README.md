# hamzakargin.com

Personal website of Hamza Kargin, JavaScript Software Engineer.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com). Static, available in English, Russian, Turkish and German.

## Getting started

Requires [Bun](https://bun.sh) 1.3 or later.

```sh
bun install
bun run dev
```

Run `bun run check` before committing. It checks formatting, lint, types, unused code and spelling.

```sh
bun run test       # unit tests
bun run test:e2e   # end-to-end tests against the production build
```

## Structure

```text
src/
├── components/   Astro components, shadcn/ui in ui/
├── content/      Blog posts, ship log, projects and profile data
├── i18n/         Translations
├── pages/        Routes, localized under [lang]/
└── styles/       Theme
```

## Adding content

Everything lives in `src/content/` and is validated at build time.

| Content                                      | Location                 |
| -------------------------------------------- | ------------------------ |
| Blog post                                    | `blog/<slug>.mdx`        |
| Ship log entry                               | `log/<date>-<name>.yaml` |
| Project                                      | `projects/<name>.md`     |
| Experience, education, certifications, stack | `*.yaml`                 |

Posts with `draft: true` are hidden. Social images, RSS, sitemap and search are generated from the content.

## Deployment

Pushes to `main` build a Docker image served by nginx and deploy it with [Dokploy](https://dokploy.com).

## License

The code is [MIT](LICENSE). Feel free to use it for your own site. The content (blog posts, images and personal information) is not covered by the license, so please don't reuse it.
