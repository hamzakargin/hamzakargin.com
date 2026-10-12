# hamzakargin.com

Personal website of Hamza Kargin, JavaScript Software Engineer.

## Tech stack

- [Astro](https://astro.build) with [React](https://react.dev) islands
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com)
- [MDX](https://mdxjs.com) with Astro content collections
- [Geist](https://vercel.com/font) font, [Lucide](https://lucide.dev) icons
- [Bun](https://bun.sh) for installing, scripts and builds
- [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter), [lefthook](https://lefthook.dev), [knip](https://knip.dev)
- Docker image served by nginx, deployed with [Dokploy](https://dokploy.com)

## Getting started

Requires [Bun](https://bun.sh) 1.3 or later.

```sh
bun install
bun run dev
```

The site runs at http://localhost:4321.

## Scripts

| Command            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `bun run dev`      | Start the dev server                                 |
| `bun run build`    | Build the static site into `dist/`                   |
| `bun run preview`  | Preview the production build                         |
| `bun run check`    | Format check, lint, type check and unused code check |
| `bun run format`   | Format all files                                     |
| `bun run lint:fix` | Lint and auto-fix                                    |

## Project structure

```text
.
├── public/                Static files copied as-is
├── src/
│   ├── assets/            Images optimized at build time
│   ├── components/
│   │   └── ui/            shadcn/ui components
│   ├── content/
│   │   ├── blog/          Blog posts (MDX)
│   │   └── projects/      Projects (MDX)
│   ├── layouts/           Page layouts
│   ├── lib/               Utilities
│   ├── pages/             Routes
│   ├── styles/            Global styles and theme
│   └── content.config.ts  Content collection schemas
├── Dockerfile
└── nginx.conf
```

## Deployment

Every push to `main` runs CI, builds a Docker image, pushes it to GitHub Container Registry and triggers a Dokploy deploy.

## License

[MIT](LICENSE)
