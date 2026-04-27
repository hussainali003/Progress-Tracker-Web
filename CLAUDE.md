# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (expects backend at `http://localhost:3000`)
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run fix` — run Biome format + lint with autofix on `src/`

No test runner is configured.

Linting uses **two tools**: Biome (formatting + most rules, see [biome.json](biome.json)) and ESLint (react-hooks + react-refresh rules only, see [eslint.config.js](eslint.config.js)). `npm run fix` only invokes Biome — run ESLint manually (`npx eslint .`) if you need hook-rule checks.

## Tech stack

React 19, React Router 7, Tailwind CSS 4, Zustand (state), Yup (validation), Luxon (dates), Recharts (charts), react-day-picker (calendar), react-modal, react-icons.

Vite is overridden to **rolldown-vite** (`overrides` in [package.json](package.json)) — keep this when bumping vite.

## Architecture

### Routing & auth boundary
[src/App.jsx](src/App.jsx) defines all routes. Auth is **JWT in localStorage** (key: `"token"`):
- `/` → [AuthPage](src/pages/Auth/AuthPage.jsx) is a splash that redirects to `/dashboard` (token present) or `/login`
- `/login`, `/register` are public
- `/dashboard`, `/habit/:habitId` are wrapped in [ProtectedRoute](src/navigation/ProtectedRoute.jsx), which redirects to `/` if `localStorage.token` is missing
- Each `src/api/*.js` call manually reads `localStorage.getItem("token")` and sends it as `Authorization: Bearer ${token}` — there is no shared fetch wrapper

### Backend coupling
The backend URL `http://localhost:3000` is **hardcoded as `const API_URL`** at the top of every file in [src/api/](src/api/) (`auth.js`, `habit.js`, `habitRow.js`). Changing the backend means editing all three. No `.env` is wired up.

API responses sometimes contain ISO date strings — these are converted to JS `Date` or Luxon `DateTime` **at the API boundary**, not in components (see `getHabitDetail` in [src/api/habit.js](src/api/habit.js#L73), and the `completedDates` mapping in [Dashboard/index.jsx](src/pages/Dashboard/index.jsx#L26)).

### State
A single Zustand store [src/store/habitStore.js](src/store/habitStore.js) holds `habits` (list, used on Dashboard) and `habit` (single, used on HabitDetail). Components select individual fields with `useHabitStore((s) => s.foo)` rather than destructuring the whole store. Local UI state (modals, loading, errors) stays in components via `useState`.

### Page structure (co-location pattern)
pages live under [src/pages/](src/pages/), each with its own `components/` subfolder for **page-only** components:

```
pages/Dashboard/
  index.jsx
  components/      ← Dashboard-only
  sections/        ← top-level layout slots (ControlPanel, DisplayPanel)
  createHabit/     ← feature subfolder, with its own components/
pages/HabitDetail/
  index.jsx
  components/      ← page-only, includes nested modal/ feature
  charts/          ← recharts wrappers
```

There is **no `src/components/` folder for shared UI**. As a result, a handful of form controls (`ColorDropDownButton`, `CalendarNavButton`, `EndDateDropDownButton`, `TimeInput`, `RepeatDropdownButton`, `DateDropDownButton`) currently exist as **duplicates** in both `Dashboard/createHabit/components/` and `HabitDetail/components/modal/components/`. If you change one, change both — or factor them into `src/components/`.

### Validation
Yup schemas in [src/validation/](src/validation/) are validated in form submit handlers with `schema.validate(data, { abortEarly: false })`. The catch block reads `err.errors[0]` to surface the first message. Follow this pattern for new forms.

## Conventions

- Biome enforces 2-space indent, 100-char line width.
- The unused-vars rule ignores identifiers matching `^[A-Z_]` (see [eslint.config.js](eslint.config.js#L26)) — capitalized React imports and constants won't trigger it.
- `pages/` is capitalized; everything else under `src/` is lowercase. Match the existing case when adding folders.
- Tailwind colors are inline arbitrary values (`bg-[#171717]`, `text-[#909699]`) — there's no theme config yet.
