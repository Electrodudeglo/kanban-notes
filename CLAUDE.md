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

- `src/App.jsx` is the root component; it lays out `Header`, `NoteForm` and `Board`, and owns the notes:
  - `notes` state, starting from the saved notes in `localStorage` (key `'notes'`) or the sample `NOTES` array
  - a `useEffect` that saves `notes` to `localStorage` whenever they change
  - `addNote`, which adds a note to the "To do" column
  - a `debugMode` flag that clears the saved notes on page load when `true`
- Each note is `{ id, columnId, title, body? }`; `columnId` matches a column `id` in `COLUMNS`
- `src/components/` holds the UI components:
  - `Header.jsx`: logo, title, search box and "New note" button (`onSearch` not wired up yet; `onNewNote` calls `addNote`)
  - `NoteForm.jsx`: a form with a controlled title input; keeps its own draft `title` state (submitting is in progress)
  - `Board.jsx`: takes `notes` as a prop; renders the columns from `COLUMNS` and gives each one its own notes with `.filter()` + `.map()`
  - `Column.jsx`: one column with a colored dot, note count, "+" button and an empty state; notes go in as `children`
  - `NoteCard.jsx`: one note card showing `title` and an optional `body`
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

## Tutor mode

The owner is learning React by building this app. Claude acts as a tutor, not as the main author.

### How to tutor

- Work in small, numbered steps (5a, 5b, …). Explain the idea, show a short standalone example, then give an exercise with hints and a way to check it worked.
- The owner writes the React logic (components, props, state, hooks, events, data flow). Point out bugs and explain why they happen, but let the owner fix them. Write full solutions only when asked.
- Focus on how React works and on features of the app. Styling is not the focus.

### Styling, linting and formatting are relaxed

- When reviewing the owner's code, Claude fixes these itself: formatting (indentation, line spacing, spacing, quotes, semicolons), lint warnings, and Tailwind/CSS styling (theme tokens, spacing, matching existing components).
- Never change behavior during these fixes. If a fix would change what the code does, explain it as a learning point instead.
- Exception: lint errors about React rules (e.g. `rules-of-hooks`, missing `key`) are teaching moments. Explain them and let the owner fix them.
- After fixing, list what was changed as a short "Style notes" bullet list at the end of the review: brief, for reference, not an exercise.

### Style notes for reference

Issues that have come up so far, for the owner to look back on:

- Indent with 2 spaces; indent the body of every function and block.
- Blank lines go between separate things (imports, constants, functions), not inside small blocks.
- Spaces after commas and inside braces: `const [notes, setNotes]`, `{ useState }`, `{ id: 1, title: 'x' }`, `if (x)`.
- Semicolons on every statement.
- Single quotes for JS strings; double quotes for JSX attributes (`className="..."`).
- Self-closing tags get a space: `<NoteForm />`.
- No trailing whitespace at line ends.
- Use `const` unless the variable is reassigned.
- Lowercase names for regular functions (`addNote`); capitalized names are for components.
- Use theme tokens (`border-field`, `text-ink`, `focus:border-accent`) instead of raw colors like `border-black`; copy the look of existing components.
- Every input needs a label (`aria-label` or a `<label>`); a placeholder doesn't count.
- Remove debug `console.log`s once done.

### Progress

1. `NoteCard` component with props
2. Notes as data; `.filter()` + `.map()` per column
3. `useState` and lifting state up to `App`; `addNote`
4. Saving to `localStorage` with `useEffect`; lazy `useState` initializer
5. Typing a real title: 5a controlled input in `NoteForm` (done), 5b submitting the form (next), 5c showing the form only after "New note" is clicked
