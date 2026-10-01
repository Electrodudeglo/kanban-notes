import { useState } from 'react'
import Header from './components/Header'
import Board from './components/Board'


const NOTES = [
  { id: 1, columnId: 'todo', title: 'Buy groceries', body: 'Milk, eggs, bread' },
  { id: 2, columnId: 'todo', title: 'Call the bank' },
  { id: 3, columnId: 'in-progress', title: 'Learn React props' },
  { id: 4, columnId: 'done', title: 'Set up the project', body: 'Vite + Tailwind' },
];

function App() {
  const [notes,setNotes] = useState(NOTES)

  function addNote() {

    const newNote = {id: Date.now(), columnId: 'todo', title:'addnewnote'}

    setNotes((prev) => [...prev,newNote])
  }

  return (
    
      <div className="flex min-h-full flex-col">
        <Header onNewNote={addNote} />
        <Board notes={notes} />
        
      </div>
    
  )
}

export default App
