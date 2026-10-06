import { useState } from 'react';

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() == '') {
      alert('Add Title');
    } else {
      onAdd(title);
    }
    setTitle('');
  }

  return (
    <form className="px-4 md:px-8" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label="Note title"
        placeholder="New note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-11 w-full rounded-[10px] border border-field bg-white px-3.5 text-[15px] text-ink outline-none focus:border-accent md:w-70"
      />
      <p>{title}</p>
    </form>
  );
}
