import { useState } from 'react'
import Header from './components/Header'
import Board from './components/Board'


function App() {
  // const [query, setQuery] = useState('')

  return (
    <>
      <div class="flex min-h-full flex-col">
        <Header />
        <Board />
      </div>
    </>
  )
}

export default App
