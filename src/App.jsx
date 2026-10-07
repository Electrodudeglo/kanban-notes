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

  return (
    <div className="flex min-h-full flex-col">
      <Header onNewNote={() => setIsAdding(true)} />
      {isAdding && <NoteForm onAdd={addNote} onClose={() => setIsAdding(false)} />}
      <Board notes={notes} onRemove={deleteNote} />
    </div>
  );
}

export default App;
