import { useState } from 'react';
import Column from './Column';
import NoteCard from './NoteCard';
import NoteCardPreview from './NoteCardPreview';
import { COLUMNS } from '../columns';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Board({ notes, onRemove, onEdit, onAddNote, onMoveNote }) {
  const [activeId, setActiveId] = useState(null);
  const activeNote = notes.find((note) => note.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  function handleDrag(event) {
    setActiveId(null);

    if (!event.over) {
      return; // dropped outside every zone
    }

    const overId = event.over.id;
    const droppedOnColumn = COLUMNS.some((column) => column.id === overId);

    const targetColumnId = droppedOnColumn ? overId : notes.find((note) => note.id === overId).columnId;

    onMoveNote(event.active.id, targetColumnId);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragEnd={handleDrag}
    >
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
              id={column.id}
            >
              <SortableContext items={columnNotes} strategy={verticalListSortingStrategy}>
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
              </SortableContext>
            </Column>
          );
        })}
      </main>
      <DragOverlay>
        {activeNote ? <NoteCardPreview title={activeNote.title} body={activeNote.body} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
