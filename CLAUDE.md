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
  - `addingTo` state (the column id a new note goes to, or `null`); the adding `NoteForm` is only rendered while it's set
  - `editId` state (the id of the note being edited, or `null`) and `editingNote`, the note found from it with `.find()`; a second `NoteForm` is rendered while `editingNote` exists
  - `notes` state, starting from the saved notes in `localStorage` (key `'notes'`) or the sample `NOTES` array, with notes whose column is no longer in `COLUMNS` filtered out (`.filter()` + `.some()`)
  - a `useEffect` that saves `notes` to `localStorage` whenever they change
  - `addNote(columnId, title, body)`, which adds a note to that column and closes the form
  - `deleteNote(id)`, which removes a note with `.filter()`
  - `updateNote(id, colId, newTitle, newBody)`, which replaces a note's column, title and body with `.map()` and closes the edit form
  - `moveNote(noteId, columnId)`, which changes only a note's column with `.map()` (used by drag and drop)
  - `resetData()`, a temporary helper behind the header's reset button that clears the saved notes and reloads the page
- `src/columns.js` exports `COLUMNS`, the list of columns (`{ id, title, color }`) used by `App`, `Board` and `NoteForm`
- Each note is `{ id, columnId, title, body? }`; `columnId` matches a column `id` in `COLUMNS`
- `src/components/` holds the UI components:
  - `Header.jsx`: logo, title, search box, "New note" button and a temporary reset button (`onSearch` not wired up yet; `onNewNote` opens the note form for "To do"; `onDataReset` calls `resetData`)
  - `NoteForm.jsx`: a modal dialog used for both adding and editing; starts from `initialTitle`/`initialBody` (default `''`) and `initialColId`, keeps its own draft state, calls `onSave(columnId, title, body)` on submit and `onClose` on Cancel, Escape or a click outside; has a "Column" radio group at the top, built from `COLUMNS` with `.map()` and controlled by `colSelection` state; an empty title sets `inputError`, which shows a red message under the Title field until the title is edited
  - `Board.jsx`: keeps `activeId` (the note being dragged, or `null`) and derives `activeNote` with `.find()`; wraps the board in one dnd-kit `DndContext` (pointer sensor with a 5px activation distance, plus keyboard) with a `DragOverlay`, whose `handleDrag` calls `onMoveNote(noteId, columnId)` when a card is dropped on a column (and does nothing when dropped outside one); takes `notes`, `onRemove`, `onEdit`, `onAddNote` and `onMoveNote` as props; gives each card its own `onRemove`/`onEdit` with the note's id built in, and each column its own `onAddNote` with the column's id built in; renders the columns from `COLUMNS` and gives each one its own notes with `.filter()` + `.map()`
  - `Column.jsx`: one column with a colored dot, note count, "+" button (`onAddNote`, opens the form for that column) and an empty state; notes go in as `children`; a drop target via `useDroppable` with its `id` prop; its border turns `border-accent` while a card is over it (`isOver`)
  - `NoteCard.jsx`: one note card showing `title`, an optional `body`, and edit and delete buttons (`onEdit`, `onRemove`); draggable with `useDraggable` using its `id` prop; stays in place and fades (`isDragging`) while being dragged
  - `NoteCardPreview.jsx`: a plain copy of a card (title, body and non-interactive edit/delete icons so it matches the real card's size; no hooks or handlers) shown in the `DragOverlay` while dragging
- `src/index.css` holds the Google Fonts import, the Tailwind import, design tokens in `@theme` (colors such as `bg-page` and `text-accent`, plus `font-display`) and base body styles
- `public/` holds static files (favicon, `productivity-pattern.svg`, which is currently unused)

## Conventions

- Style with Tailwind utility classes; keep `src/index.css` for global styles only.
- Add new colors and fonts as tokens in `@theme` in `src/index.css`, and use the generated utilities rather than hex values in components. Use inline styles only for values that come from data at runtime (e.g. column dot colors).
- Fonts: IBM Plex Sans for body text (`font-sans`) and Fraunces for headings (`font-display`).
- Light mode only; dark mode is disabled for now.
- Drag and drop uses dnd-kit (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`; already installed).

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
8. Column "+" buttons: 8a back to a working state (done), 8b `addingTo` state replacing `isAdding` (done), 8c passing the column to `addNote` from `App`'s `onSave` arrow (done), 8d wiring each column's "+" button through `Board` (done)
9. Self-study (done, ended early): the owner refactored a little and styled a column picker in `NoteForm`
10. Choosing the column in `NoteForm`: 10a controlled radios with a `colSelection` state (done), 10b sending the column up through `onSave` so new notes land in the picked column (done), 10c moving a note to another column when editing (done), 10d rendering the radios from `COLUMNS` with `.map()` (done), 10e removing saved notes whose column no longer exists in `COLUMNS` (done)
11. Self-study (done): error message instead of `alert` in `NoteForm`
12. Moving cards between columns with dnd-kit (done): 12a `DndContext` in `Board` and `useDraggable` on `NoteCard` (done), 12b `useDroppable` on `Column` and an `onDragEnd` that moves the note to the column it was dropped on with an `isOver` border highlight (done), 12c polish (done): 12c-1 a sensor activation distance so the card's edit/delete buttons still click, 12c-2 tracking the dragged note in `activeId` state, 12c-3 a `DragOverlay` showing a copy of the card above everything (uses the `NoteCardPreview` component), 12c-4 leaving the original card in place, faded, while dragging
13. Re-sorting cards (next): dropping a card in the middle of a column puts it there instead of at the bottom, by re-ordering the `notes` array
    - 13a `@dnd-kit/sortable` (`SortableContext` per column, `useSortable` on `NoteCard` in place of `useDraggable`)
    - 13b `handleDrag` learns that `over.id` can now be a note id as well as a column id, and works out the target column and position
    - 13c re-ordering the `notes` array with `arrayMove` (or `.splice()`) so the order is saved to `localStorage`
14. Undoing a delete: a small toast with an "Undo" button after a card is deleted, so deletes are not final for a while
    - 14a `deleteNote` keeps the removed note (and its position) in state instead of dropping it
    - 14b a `Toast` component that shows for a few seconds with `setTimeout` (cleaned up in a `useEffect`)
    - 14c "Undo" puts the note back where it was; the toast closing for good discards it
    - 14d (later, optional) a trash can that holds deleted notes, with restore and empty
15. Searching notes from the header's search box: 15a a `searchQuery` state in `App` wired to `onSearch`, 15b filtering the notes passed to `Board` (derived from state, not stored), 15c case-insensitive matching on title and body, plus a "no matches" state

### Small issues to sort before calling it done

Keep entries short (one line each). Tick them off as they are fixed.

- [x] Push `NoteCardPreview.jsx` and the matching `Board`/`NoteCard` changes (the 12c work) from the other laptop; then add `NoteCardPreview` to Project structure.
- [ ] `JSON.parse(localStorage.getItem('notes'))` in `App` throws on corrupt data and doesn't check it is an array; wrap in `try`/`catch` and fall back to `NOTES`.
- [ ] `localStorage.setItem` in the `useEffect` can throw (quota full, private mode); wrap in `try`/`catch`.
- [ ] Remove the temporary "Reset Data" button in `Header` and `resetData` in `App`.
- [ ] `Header`'s search input is uncontrolled and `onSearch` is not passed from `App` yet (done by task 15).
- [ ] `addNote` uses `Date.now()` as the id; two notes created in the same millisecond would clash. Fine for now, but `crypto.randomUUID()` is safer.
- [ ] `addNote` and `updateNote` save an empty `body` as `''`; `NoteCard` already hides it, so harmless, but be consistent with the sample notes (no `body` key).
- [ ] `Board` hardcodes `md:grid-cols-3`; it won't follow if `COLUMNS` changes length.
- [ ] `NoteForm`'s Escape `useEffect` re-subscribes on every render because `onClose` is a new arrow each time; harmless, but can be noted for later.
- [ ] Keyboard dragging (`KeyboardSensor`) is set up; check that Space/Enter on a card's edit or delete button still clicks the button instead of starting a drag.
- [ ] `public/productivity-pattern.svg` is unused; delete it or use it.
- [ ] Re-run `npm run lint` and `npm run build` and check the app in the browser once more at the end.
