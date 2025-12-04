/* import { useState, useEffect } from 'react';

import { Entry } from "../types";
import { getAllEntries, createEntry } from '../services/entryService';

const Form = (entries, setNotes) => {
  const [newEntry, setNewEntry] = useState('');
 


  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({ content: newEntry }).then(data => {
      setNotes(entries.concat(data))
    })
    setNewEntry('')
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewEntry(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}
export default Form */