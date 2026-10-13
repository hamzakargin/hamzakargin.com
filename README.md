# hamzakargin.com

Personal website of Hamza Kargin, JavaScript Software Engineer.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com). Static, available in English, Russian, Turkish and German.

## Getting started

Requires [Bun](https://bun.sh) 1.3 or later.

```sh
bun install
bun run dev
```

Run `bun run check` before committing. It formats, lints, type checks and looks for unused code.

## Structure

```text
src/
├── components/   Astro components, shadcn/ui in ui/
├── content/      Blog posts, ship log, projects and profile data
├── i18n/         Translations
├── pages/        Routes, localized under [lang]/
└── styles/       Theme
```

## Deployment

Pushes to `main` build a Docker image served by nginx and deploy it with [Dokploy](https://dokploy.com).

## License

The code is [MIT](LICENSE). Feel free to use it for your own site. The content (blog posts, images and personal information) is not covered by the license, so please don't reuse it.
