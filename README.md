# Case Management — Hands-on Frontend Assessment

A responsive enterprise case-management interface replicating the supplied Figma
design, built with **Next.js (App Router) + React + TypeScript**.

## Tech stack

| Concern          | Choice                                            |
| ---------------- | ------------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19                 |
| Language         | TypeScript (strict)                               |
| Styling          | Tailwind CSS v4                                   |
| UI primitives    | shadcn/ui (Button, Badge, Skeleton)               |
| Icons            | lucide-react                                      |
| Data fetching    | TanStack React Query                              |
| Mock API         | Next.js Route Handlers (`app/api/*`)              |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

The root route redirects to the case detail screen at `/cases/1700541112`.

Other scripts:

```bash
npm run build    # production build + type check
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
app/
  api/cases/[id]/route.ts   Mock REST endpoint returning a CaseDetail
  cases/[id]/page.tsx       Case detail screen (client component)
  dashboard/page.tsx        Placeholder dashboard route
  layout.tsx                Root layout: providers + top navigation
components/
  case/                     Feature components for the case screen
  ui/                       shadcn/ui primitives
  providers.tsx             React Query client provider
  top-nav.tsx               Application header + primary navigation
lib/
  types.ts                  Domain models (single source of truth)
  mock-db.ts                In-memory data seeded from the design
  api.ts                    Typed fetch layer + ApiError
  queries.ts                React Query hooks and query keys
```

## Architecture notes

**Separation of concerns.** `lib/api.ts` owns transport (fetch, status checks,
error normalisation into `ApiError`). `lib/queries.ts` owns caching and request
state via React Query. Components only consume typed data — none of them call
`fetch` directly.

**Type safety.** Every field rendered on screen is described in `lib/types.ts`
and shared by the route handler and the UI, so a change to the API contract
fails the build rather than the browser. There is no `any` in the codebase.

**Application states.** The case screen renders four distinct states:

- _Loading_ — a layout-matching skeleton (`CasePageSkeleton`).
- _Success_ — the full overview.
- _Error_ — message plus a retry that re-runs the query.
- _Empty_ — placeholder content for tabs with no data, and for an empty timeline.

To exercise the error path, request the API with `?fail=1`
(`/api/cases/1700541112?fail=1`) — the handler returns a 502. An unknown id such
as `/cases/9999` renders the not-found variant, which correctly does **not**
offer a retry. React Query is configured to skip retries on 404 while retrying
transient failures once.

**Responsiveness.** The layout is a single column on tablet widths, where the
workflow and timeline rail moves below the main content; on `lg` and above it
becomes a fixed 320px right rail. Information fields reflow from four columns to
two, and the summary cards from three columns to one.

**Reusability.** Presentational pieces (`SummaryCard`, `Field`, `TeamCard`,
`StepIndicator`) are local, composable building blocks, and shadcn/ui primitives
cover buttons, badges and skeletons.

## Mock API

`GET /api/cases/:id` returns a `CaseDetail` after a simulated 700ms latency.

| Response | Condition                |
| -------- | ------------------------ |
| `200`    | Case found               |
| `404`    | Unknown case id          |
| `502`    | `?fail=1` (error demo)   |

Swapping to a real backend means changing only the base URL in `lib/api.ts`;
components and hooks are unaffected.

## Third-party libraries

- `@tanstack/react-query` — server-state caching, request lifecycle, retries.
- `tailwindcss` — utility-first styling.
- `shadcn/ui` + `radix-ui` — accessible, unstyled UI primitives copied into the repo.
- `lucide-react` — icon set matching the design.

## Possible improvements

- Move the initial fetch to a Server Component and hydrate React Query, removing
  the client-side loading state on first paint.
- Add MSW-backed integration tests and Playwright coverage for the state matrix.
- Introduce URL-synced tab state so a tab is deep-linkable and shareable.
- Add pagination and server-side filtering once the case list screen exists.
