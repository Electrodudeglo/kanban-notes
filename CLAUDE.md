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

- `src/App.jsx` holds the app: `Header`, `Board` and `Column` components
- `src/index.css` holds the Tailwind import, color variables and the page background
- `public/` holds static files (favicon, background pattern)

## Conventions

- Style with Tailwind utility classes; keep `src/index.css` for global styles only.
- Light mode only; dark mode is disabled for now.
- Drag and drop uses dnd-kit (`@dnd-kit/core`, `@dnd-kit/sortable`).

## Rules

<!-- Add project-specific rules for Claude here. -->
