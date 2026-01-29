# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` holds the Next.js App Router routes and layout/page files.
- `src/components/` contains shared UI components.
- `src/data/` stores static data/config used by the app.
- `src/services/` encapsulates client-side helpers and integrations.
- `src/types/` keeps shared TypeScript types.
- `public/` contains static assets served at the site root (e.g., `/images/...`).
- `dist/assim-ou-assado/` is generated after build (see `postbuild`).

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: build the Next.js app for production.
- `npm run start`: run the production server from the build output.
- `npm run lint`: run ESLint with Next.js core-web-vitals and TypeScript rules.
- `npm run test`: run unit tests with Vitest.
- `npm run postbuild`: moves the exported build output into `dist/assim-ou-assado`.

## Coding Style & Naming Conventions
- TypeScript + React (Next.js App Router). Use `.tsx` for components and `.ts` for utilities.
- Indentation: 2 spaces (match existing formatting).
- ESLint is the primary style gate (`eslint.config.mjs`); run `npm run lint` before PRs.
- File/folder names use `kebab-case` for routes and `PascalCase` for React components.

## Testing Guidelines
- Vitest is the unit test framework for this repo.
- If adding tests, prefer colocating under `src/` with `*.test.ts(x)` naming.
- Document any new test commands in `package.json` and update this file.

## Commit & Pull Request Guidelines
- Commit messages in history are short, imperative, and start with a verb (e.g., “Fix consent banner to start hidden”, “Add GTM”).
- PRs should include a clear description, list of key changes, and screenshots for UI changes.
- Link relevant issues/tickets if they exist and call out any config or deployment impacts.

## Configuration Notes
- `next.config.ts` and `wrangler.jsonc` control build/runtime configuration.
- Avoid committing generated build output unless explicitly requested.
