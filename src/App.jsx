import { useState } from 'react'

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <Header query={query} onQueryChange={setQuery} />
      <Board />
    </>
  )
}

function Header({ query, onQueryChange }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-black/10 px-6 py-4">
      <a href="/" className="flex items-center gap-2 text-xl font-semibold text-(--text-h)">
        <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
          <rect x="2" y="3" width="6" height="18" rx="1.5" fill="currentColor" />
          <rect x="9" y="3" width="6" height="12" rx="1.5" fill="currentColor" opacity="0.6" />
          <rect x="16" y="3" width="6" height="8" rx="1.5" fill="currentColor" opacity="0.35" />
        </svg>
        Kanbanner
      </a>
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search cards..."
        aria-label="Search cards"
        className="w-full max-w-64 rounded-lg border border-black/10 bg-white/70 px-3 py-1.5 text-base outline-none focus:border-black/30"
      />
    </header>
  )
}

function Board() {
  return (
    <main className="flex-1 p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((column) => (
          <Column key={column.id} title={column.title} />
        ))}
      </div>
    </main>
  )
}

function Column({ title }) {
  return (
    <section className="flex min-h-96 flex-col rounded-2xl border border-black/10 bg-white/60 p-4">
      <h2 className="text-lg font-medium text-(--text-h)">{title}</h2>
    </section>
  )
}

export default App
