
import { useState } from 'react';

export default function NoteForm(){
const [title, setTitle] = useState('');
return (
    <form className='px-4 md:px-8'>
        <input className='border border-field bg-white text-ink rounded-[10px] h-11 px-3.5 outline-none focus:border-accent' aria-label="Note title" placeholder='new note' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <p>{title}</p>
    </form>
    );
}
