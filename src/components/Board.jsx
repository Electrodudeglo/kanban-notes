import Column from './Column';
import NoteCard from './NoteCard';
import { COLUMNS } from '../columns';
import { DndContext } from '@dnd-kit/core';

export default function Board({ notes, onRemove, onEdit, onAddNote }) {
  return (
    <DndContext onDragEnd={(event) => console.log(event.active.id)}>
      <main className="grid flex-1 grid-cols-1 gap-5 p-4 md:grid-cols-3 md:px-8 md:pt-6 md:pb-8">
        {COLUMNS.map((column) => {
          // Keep only the notes whose columnId matches this column's id.
          const columnNotes = notes.filter((note) => note.columnId === column.id);

          return (
            // `key` helps React track list items between renders — always use a stable id.
            <Column
              key={column.id}
              title={column.title}
              color={column.color}
              count={columnNotes.length}
              onAddNote={() => onAddNote(column.id)}
            >
              {columnNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  onRemove={() => onRemove(note.id)}
                  onEdit={() => onEdit(note.id)}
                />
              ))}
            </Column>
          );
        })}
      </main>
    </DndContext>
  );
}
