import { useState, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import NoteForm from './components/NoteForm';


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


function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem('notes')) ?? NOTES;
  });

  const [editId, setEditId] = useState(null);

  const [addingTo, setAddingTo] = useState(null);
  
  const editingNote = notes.find((note) => note.id === editId);


  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

 
  function addNote(columnId, title, body) {
    const newNote = { id: Date.now(), columnId, title, body };
    setNotes((prev) => [...prev, newNote]);
    setAddingTo(null);
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

  //Delete this when finishing everything
  function resetData() {
     localStorage.removeItem('notes');
     window.location.reload(true)
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header onNewNote={() => setAddingTo('todo')} onDataReset={resetData} />
      {addingTo && (
        <NoteForm
          onSave={(title, body) => addNote(addingTo, title, body)}
          onClose={() => setAddingTo(null)}
          formTitle="New Note"
          initialColId={addingTo}
        />
      )}
      {editingNote && (
        <NoteForm
          initialTitle={editingNote.title}
          initialBody={editingNote.body}
          onSave={(title, body) => updateNote(editId, title, body)}
          initialColId={editingNote.columnId}
          onClose={() => setEditId(null)}
          formTitle="Edit Note"
        />
      )}
      <Board
        notes={notes}
        onRemove={deleteNote}
        onEdit={setEditId}
        onAddNote={setAddingTo}
      />
    </div>
  );
}

export default App;
