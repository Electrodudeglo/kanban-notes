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
  - `isAdding` state; `NoteForm` is only rendered while it's `true`
  - `editId` state (the id of the note being edited, or `null`) and `editingNote`, the note found from it with `.find()`; a second `NoteForm` is rendered while `editingNote` exists
  - `notes` state, starting from the saved notes in `localStorage` (key `'notes'`) or the sample `NOTES` array
  - a `useEffect` that saves `notes` to `localStorage` whenever they change
  - `addNote(title, body)`, which adds a note to the "To do" column and closes the form
  - `deleteNote(id)`, which removes a note with `.filter()`
  - `updateNote(id, newTitle, newBody)`, which replaces a note's title and body with `.map()` and closes the edit form
  - a `debugMode` flag that clears the saved notes on page load when `true`
- Each note is `{ id, columnId, title, body? }`; `columnId` matches a column `id` in `COLUMNS`
- `src/components/` holds the UI components:
  - `Header.jsx`: logo, title, search box and "New note" button (`onSearch` not wired up yet; `onNewNote` opens the note form)
  - `NoteForm.jsx`: a modal dialog used for both adding and editing; starts from `initialTitle`/`initialBody` (default `''`), keeps its own draft state, calls `onSave(title, body)` on submit and `onClose` on Cancel, Escape or a click outside
  - `Board.jsx`: takes `notes`, `onRemove` and `onEdit` as props, and gives each card its own `onRemove`/`onEdit` with the note's id built in; renders the columns from `COLUMNS` and gives each one its own notes with `.filter()` + `.map()`
  - `Column.jsx`: one column with a colored dot, note count, "+" button and an empty state; notes go in as `children`
  - `NoteCard.jsx`: one note card showing `title`, an optional `body`, and edit and delete buttons (`onEdit`, `onRemove`)
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

### Self-study steps

- During a self-study step, don't assign exercises or propose next steps. Answer questions and review changes when asked.
- Reviews work as usual: point out bugs and explain them, and fix styling, linting and formatting with a "Style notes" list.
- If a refactor changes behavior, say so plainly so the owner can decide whether that was intended.

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
- Object shorthand: `{ title }` instead of `{ title: title }` when the key and variable share a name.

### Progress

1. `NoteCard` component with props
2. Notes as data; `.filter()` + `.map()` per column
3. `useState` and lifting state up to `App`; `addNote`
4. Saving to `localStorage` with `useEffect`; lazy `useState` initializer
5. Typing a real title: 5a controlled input in `NoteForm` (done), 5b submitting the form (done), 5c showing the form as a modal only after "New note" is clicked (done)
6. Deleting a note: 6a `deleteNote` with `.filter()` (done), 6b passing it down through `Board` to the card's `x` button (done)
7. Editing a note: 7a `updateNote` with `.map()` (done), 7b opening a note for editing (done), 7c reusing `NoteForm` for edits (done)
8. Self-study (in progress): the owner reads through the code and refactors or changes things on their own. Small pieces for the owner to do:
   - Add a `heading` prop to `NoteForm` so the edit form says "Edit note" instead of "New note"
   - Remove the now-unneeded `initialTitle=""` and `initialBody=""` from the adding form in `App`
   - Wire up each column's "+" button (`onAddNote` in `Column`) so it adds a note to that column, not always to "To do"
9. Not decided yet (one option: moving notes between columns with drag and drop, using dnd-kit)
