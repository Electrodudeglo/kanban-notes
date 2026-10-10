import { useState, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import NoteForm from './components/NoteForm';

const debugMode = false;

const NOTES = [
  { id: 1, columnId: 'todo', title: 'Buy groceries', body: 'Milk, eggs, bread' },
  { id: 2, columnId: 'todo', title: 'Call the bank' },
  { id: 3, columnId: 'in-progress', title: 'Learn React props' },
  { id: 4, columnId: 'done', title: 'Set up the project', body: 'Vite + Tailwind' },

  // New rows
  { id: 5, columnId: 'todo', title: 'Clean the kitchen', body: 'Wipe counters, mop floor' },
  { id: 6, columnId: 'todo', title: 'Book dentist appointment' },
  { id: 7, columnId: 'in-progress', title: 'Write README for project' },
  { id: 8, columnId: 'in-progress', title: 'Refactor NoteCard component' },
  { id: 9, columnId: 'done', title: 'Install Node & Vite' },
  { id: 10, columnId: 'done', title: 'Create GitHub repo', body: 'Initial commit pushed' },
  { id: 11, columnId: 'todo', title: 'Plan weekend tasks' },
  { id: 12, columnId: 'in-progress', title: 'Study React conditional rendering' },
  { id: 13, columnId: 'done', title: 'Fix localStorage sync bug' },
];

// Runs once when this file loads, so every page refresh starts from NOTES.
if (debugMode) {
  localStorage.removeItem('notes');
}

function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem('notes')) ?? NOTES;
  });

  const [isAdding, setIsAdding] = useState(false);

  const [editId, setEditId] = useState(null);

  const editingNote = notes.find((note) => note.id === editId);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function addNote(title, body) {
    const newNote = { id: Date.now(), columnId: 'todo', title, body };
    setNotes((prev) => [...prev, newNote]);
    setIsAdding(false);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function updateNote(id, newTitle, newBody) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, title: newTitle, body: newBody } : note))
    );
    setEditId(null);
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header onNewNote={() => setIsAdding(true)} />
      {isAdding && (
        <NoteForm
          initialTitle=""
          initialBody=""
          onSave={addNote}
          onClose={() => setIsAdding(false)}
        />
      )}
      {editingNote && (
        <NoteForm
          initialTitle={editingNote.title}
          initialBody={editingNote.body}
          onSave={(title, body) => updateNote(editId, title, body)}
          onClose={() => setEditId(null)}
        />
      )}
      <Board notes={notes} onRemove={deleteNote} onEdit={setEditId} />
    </div>
  );
}

export default App;
