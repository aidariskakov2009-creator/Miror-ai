# Mirror AI — Digital Future Twin

> "See your future before you choose it."

A React + Vite + TypeScript + Tailwind implementation of the Mirror AI MVP: an onboarding flow that builds a "digital future twin," simulates three career paths, and lets you flip variables (learn Python, move to Germany, launch a startup...) to watch every projection recalculate live.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check and build a production bundle into dist/
npm run preview   # preview the production build locally
npm run lint      # run eslint
```

## Project structure

```
mirror-ai/
├─ index.html                 # Vite entry HTML, loads fonts + src/main.tsx
├─ package.json
├─ vite.config.ts
├─ tailwind.config.js         # design tokens: colors, fonts, keyframes
├─ postcss.config.js
├─ tsconfig.json / tsconfig.node.json
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.tsx                # React root
   ├─ App.tsx                 # top-level screen state machine
   ├─ index.css               # Tailwind directives + base styles
   ├─ types.ts                 # shared TypeScript types
   ├─ data/
   │  └─ constants.ts          # mock data + pure calculation functions
   ├─ components/              # shared building blocks
   │  ├─ MirrorMark.tsx
   │  ├─ Ring.tsx               # animated circular progress ring
   │  ├─ Chip.tsx
   │  └─ Buttons.tsx
   ├─ screens/                  # pre-app screens
   │  ├─ Landing.tsx
   │  ├─ Onboarding.tsx
   │  └─ Generating.tsx
   └─ app/
      ├─ AppShell.tsx           # sidebar + tab router, once the twin exists
      └─ screens/
         ├─ PathsScreen.tsx
         ├─ SimulatorScreen.tsx
         ├─ DashboardScreen.tsx
         ├─ MentorScreen.tsx
         ├─ TimelineScreen.tsx
         ├─ NewsScreen.tsx
         └─ MapScreen.tsx
```

## How the simulation works

All of it is deterministic, in-memory mock logic — there's no backend or LLM call wired in yet:

- `buildPaths(dream)` in `src/data/constants.ts` returns three base `FuturePath` objects (Safe / High income / Dream), seeded with the dream career name from onboarding.
- `TOGGLES` defines the 7 simulator levers, each with an `effects` object (salary multiplier, AI-risk delta, probability delta, and several metric deltas).
- `adjustPath(path, activeToggleIds)` folds the active toggles' effects into a path's salary/AI-risk/probability, clamped to sane ranges.
- `computeMetrics(activeToggleIds)` does the same for the 12-metric dashboard, starting from `BASE_METRICS`.
- The AI Mentor's answers are template functions (`MentorQA.a(ctx)`) that read the live computed numbers, so the "explanations" always match what's on screen even though there's no real model behind them.

To wire in a real backend: replace `buildPaths`/`adjustPath`/`computeMetrics` calls in `AppShell.tsx` with API calls (e.g. to an LLM or a labor-market data service), keeping the same return shapes (`FuturePath[]`, `Metrics`) so the screens don't need to change.

## Design tokens

Defined in `tailwind.config.js` and mirrored in `src/data/constants.ts` (`C`) for runtime-computed colors (e.g. a path's accent, a metric's status color):

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0A0D18` | page background |
| `surface` / `surface2` | `#12162A` / `#191F3D` | card backgrounds |
| `ink` | `#EEF1FF` | primary text |
| `muted` / `dim` | `#8F97BE` / `#5C6389` | secondary / tertiary text |
| `blue` | `#6E8CFF` | "present" accent |
| `violet` | `#C08CFF` | "future" accent |
| `teal` | `#45D9C0` | positive metric color |
| `coral` | `#FF8F6B` | risk / warning color |

Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (all numeric/data readouts), loaded via Google Fonts in `index.html`.

## Notes

- No backend, database, or real AI calls are included — `OpenAI API (mocked)` and `Supabase` from the original spec are intentionally left as integration points, not implemented.
- Everything is client-side state (`useState`), nothing persists on reload.
