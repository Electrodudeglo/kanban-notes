# Kanbanner

A kanban board and notes app built with React 19, Vite and Tailwind CSS v4.

## Environment

- Developed in WSL. Use the nvm-managed Node (`~/.nvm/...`) for all node/npm/npx commands; if `which npm` points to `/mnt/c/...`, stop and flag it.
- Git remote uses SSH (`git@github.com:Electrodudeglo/kanban-notes.git`).

## Commands

- `npm run dev` starts the Vite dev server on http://localhost:5173
- `npm run build` makes a production build
- `npm run lint` runs oxlint

## Project structure

- `src/App.jsx` is the root component; it lays out `Header` and `Board`
- `src/components/` holds the UI components:
  - `Header.jsx`: logo, title, search box and "New note" button (`onSearch`, `onNewNote` props, not wired up yet)
  - `Board.jsx`: the column list, defined as data in `COLUMNS` and rendered with `.map()`
  - `Column.jsx`: one column with a colored dot, note count, "+" button and an empty state; notes go in as `children`
- `src/index.css` holds the Google Fonts import, the Tailwind import, design tokens in `@theme` (colors such as `bg-page` and `text-accent`, plus `font-display`) and base body styles
- `public/` holds static files (favicon, `productivity-pattern.svg`, which is currently unused)

## Conventions

- Style with Tailwind utility classes; keep `src/index.css` for global styles only.
- Add new colors and fonts as tokens in `@theme` in `src/index.css`, and use the generated utilities rather than hex values in components. Use inline styles only for values that come from data at runtime (e.g. column dot colors).
- Fonts: IBM Plex Sans for body text (`font-sans`) and Fraunces for headings (`font-display`).
- Light mode only; dark mode is disabled for now.
- Drag and drop uses dnd-kit (`@dnd-kit/core`, `@dnd-kit/sortable`).

## Rules

<!-- Add project-specific rules for Claude here. -->
