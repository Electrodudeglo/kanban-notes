// One note. It only displays what it's given through props — it doesn't
// know where notes come from or how they're stored. That's the parent's job.
export default function NoteCard({ title, body }) {
  return (
    <article className="rounded-[10px] border border-line bg-white p-3.5 shadow-sm">
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      {/* Only render the body if there is one. `&&` renders the right side when the left is truthy. */}
      {body && <p className="mt-1 text-[14px] text-muted">{body}</p>}
    </article>
  );
}
