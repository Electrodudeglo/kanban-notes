import Column from './Column';

// The three columns are plain data. Rendering them with .map() means
// adding a column later is a one-line change here, not new markup.
const COLUMNS = [
  { id: 'todo', title: 'To do', color: '#8A847A' },
  { id: 'in-progress', title: 'In progress', color: '#C07A2C' },
  { id: 'done', title: 'Done', color: '#2F5D50' },
];

export default function Board() {
  return (
    <main className="grid flex-1 grid-cols-1 gap-5 p-4 md:grid-cols-3 md:px-8 md:pt-6 md:pb-8">
      {COLUMNS.map((column) => (
        // `key` helps React track list items between renders — always use a stable id.
        <Column key={column.id} title={column.title} color={column.color} />
      ))}
    </main>
  );
}