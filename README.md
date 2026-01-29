# Engineering Portfolio — Frontend

This repository contains the frontend for an engineering portfolio built with Next.js, TypeScript, Tailwind CSS and TanStack Query. It is focused on presenting projects and certifications and includes an admin area for managing content.

IMPORTANT: This README does not expose backend API endpoints or any sensitive credentials. Configure the backend via environment variables (see "Environment Variables").

## Contents

- `app/` — Next.js App Router pages and layouts
- `src/components/` — UI components and feature components
- `src/context/` — React contexts (Auth, Theme, QueryProvider)
- `src/hooks/` — Data hooks (useProjects, useCertificates)
- `src/lib/` — API client and domain services
- `src/types/` — TypeScript types and constants
- `docs/` — Project documentation (includes frontend context)

See `FRONTEND_CONTEXT.md` and `docs/frontend_context.md` for a complete design and implementation guide.

## Key Features

- Next.js 16 (App Router) with server and client components
- TypeScript-first codebase
- Tailwind CSS v4 with a dual-theme system (Ghibli light / JJK dark)
- TanStack Query for server state and caching
- React Hook Form + Zod for validation
- Sonner for theme-aware toast notifications
- Per-page Error Boundaries for robust error handling
- Playwright E2E tests and Vitest unit tests

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- @tanstack/react-query
- react-hook-form, zod
- framer-motion
- sonner (toasts)
- @playwright/test (E2E)
- vitest (unit tests)

## Getting Started

Prerequisites:

- Node.js 18+ (recommended)
- npm (or Yarn)

1. Install dependencies

```bash
npm install
```

2. Environment variables

Create a `.env.local` file in the project root. At minimum configure the frontend to talk to the backend via the API base URL environment variable. Do NOT commit this file.

```env
# Example (do not hardcode an actual URL here)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

3. Run the development server

```bash
npm run dev
# Open http://localhost:3000
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run test` — Run unit tests (Vitest)
- `npm run test:run` — Run unit tests once
- `npm run test:coverage` — Run tests with coverage
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run test:e2e:ui` — Run Playwright in UI mode

## Testing

Unit tests use Vitest and React Testing Library. E2E tests use Playwright and include representative user flows (navigation, filtering, contact form, admin redirect behavior).

Run unit tests:

```bash
npm run test
```

Run E2E tests (dev server must be running or Playwright will start it automatically):

```bash
npm run test:e2e
```

## Development Notes

- Data fetching: prefer using the `src/hooks/*` hooks which wrap TanStack Query. Use the query keys factory pattern to keep queries consistent.
- Forms: use React Hook Form and Zod for validation. Keep server validation in sync with frontend Zod schemas.
- Theme: the `ThemeProvider` exposes `isGhibli` (light) and `isJJK` (dark) flags via `useTheme()`.
- Error handling: pages are wrapped with `ErrorBoundary` (per-page boundaries) to catch runtime errors and present a friendly fallback.
- Toasts: the `Toaster` provided by `sonner` is added to the root layout and is theme-aware.

## API & Security

This project communicates with a backend API configured via `NEXT_PUBLIC_API_URL`. For security and privacy reasons this README intentionally omits concrete backend endpoint paths and any credentials. Consult the backend repository or the `FRONTEND_CONTEXT.md` if you need API contract details.

Do not store sensitive tokens in client-accessible storage. The app expects the backend to use `HttpOnly` cookies for authentication when appropriate.

## Directory Structure (short)

```
app/
src/
	components/
	context/
	hooks/
	lib/
	types/
docs/
FRONTEND_CONTEXT.md
playwright.config.ts
e2e/
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Run lint and tests
4. Open a pull request with a clear description

Please follow the coding conventions in the repository (TypeScript strict mode, Tailwind utility classes, `cn` helper for conditional classes).

## Useful Links

- Frontend context and patterns: `FRONTEND_CONTEXT.md` and `docs/frontend_context.md`
- Component library: `src/components/ui`
- Hooks & API: `src/hooks`, `src/lib`

## License

This repository does not include a license file. Add a `LICENSE` file if you intend to make the project open source.

## Contact

If you need help or want to suggest improvements, open an issue or PR in this repository.
