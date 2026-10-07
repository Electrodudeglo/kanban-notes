import Column from './Column';
import NoteCard from './NoteCard'

// The three columns are plain data. Rendering them with .map() means
// adding a column later is a one-line change here, not new markup.
const COLUMNS = [
  { id: 'todo', title: 'To do', color: '#8A847A' },
  { id: 'in-progress', title: 'In progress', color: '#C07A2C' },
  { id: 'done', title: 'Done', color: '#2F5D50' },
];

export default function Board({ notes, onRemove, onEdit }) {
  return (
    <main className="grid flex-1 grid-cols-1 gap-5 p-4 md:grid-cols-3 md:px-8 md:pt-6 md:pb-8">
      {COLUMNS.map((column) => {
        // Keep only the notes whose columnId matches this column's id.
        const columnNotes = notes.filter((note) => note.columnId === column.id);

        return (
          // `key` helps React track list items between renders — always use a stable id.
          <Column key={column.id} title={column.title} color={column.color} count={columnNotes.length}>
            {columnNotes.map((note) => (
              <NoteCard key={note.id} title={note.title} body={note.body} onRemove={() => onRemove(note.id)} onEdit={() => onEdit(note.id)} />
            ))}
          </Column>
        );
      })}
    </main>
  );
}