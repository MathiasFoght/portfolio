# Repository Guidelines

## Project Structure & Module Organization
- `src/app` hosts the Next.js App Router pages, layouts, and route handlers.
- `src/app/sections` and `src/app/components` contain page-level sections and co-located UI pieces.
- `src/components` is for shared, reusable UI components.
- `src/lib` holds utilities and shared helpers; `src/types` contains TypeScript types.
- Static assets live in `public/` (e.g., images, icons). Global styles are in `src/app/globals.css`.

## Build, Test, and Development Commands
- `npm run dev` starts the local dev server at `http://localhost:3000`.
- `npm run build` creates a production build.
- `npm run start` runs the production server from the build output.
- `npm run lint` runs Next.js ESLint checks.
- `npm run format` formats the repo with Prettier.

## Coding Style & Naming Conventions
- Language: TypeScript + React with the Next.js App Router.
- Formatting: use Prettier (`npm run format`) and keep files consistent with existing style.
- Linting: resolve ESLint warnings from `npm run lint` before opening a PR.
- Naming: follow existing patterns (e.g., `PascalCase` for React components, `camelCase` for functions/props). Keep CSS modules in `*.module.css` when needed.

## Testing Guidelines
- There is no dedicated test framework configured in this repo at the moment.
- If you add tests, document the tool and include a runnable script in `package.json`.

## Commit & Pull Request Guidelines
- Commit messages are short, lower-case, and descriptive (e.g., `minor fix`, `email template added`).
- PRs should include:
  - A brief summary of changes and why they’re needed.
  - Screenshots or screen recordings for UI changes.
  - Notes on any new environment variables or build steps.

## Configuration Notes
- Use `.env` for local secrets and API keys (do not commit them).
- Prefer adding new config under `src/config` or `next.config.ts` with clear names.
