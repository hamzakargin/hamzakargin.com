# Contributing

Thanks for taking the time to help. Bug fixes, accessibility and performance improvements, translation fixes and documentation updates are all welcome.

This is a personal website, so blog posts, projects and other personal content are not open for contributions. For larger changes, please [open an issue](https://github.com/hamzakargin/hamzakargin.com/issues/new/choose) first so we can agree on the approach.

## Setup

Requires [Bun](https://bun.sh) 1.4 or later.

```sh
git clone https://github.com/hamzakargin/hamzakargin.com.git
cd hamzakargin.com
bun install
bun run dev
```

## Before opening a pull request

```sh
bun run check      # formatting, lint, types, unused code and spelling
bun run test       # unit tests
bun run test:e2e   # end-to-end tests against the production build
```

Run `bunx playwright install chromium` once before the first end-to-end run.

## Guidelines

- Keep pull requests small and focused on one change.
- Match the existing code style. Formatting and linting run on every commit.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org), for example `fix: keep the menu open on resize`.
- Translations live in `src/i18n/ui.ts`. Every language must have every key, and the tests check this.
- Keep the site static. New client-side JavaScript needs a good reason.

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By taking part you agree to follow it.
