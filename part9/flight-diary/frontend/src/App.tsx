
import { useEffect, useState } from 'react'

import  Form  from './components/Form'

import type { Entry, NewEntry } from './types'

import List  from './components/List'

import { getAllEntries, createEntry } from './services/entryService';


const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [errorMessage, setErrorMessage] = useState <string>("");

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const entryCreation = (newEntry: NewEntry) => {
    createEntry(newEntry).then(data => {
      setEntries(entries.concat(data))
   
    }).catch(err => {
      console.log("Failed to create entry:", err.response?.data);
      setErrorMessage("Failed to create entry: " + err.response?.data)
      setTimeout(() => { setErrorMessage("")}, 5000)
    });
   
  };

  return (
    <div>
      <h1>Welcome to my flight diary!</h1>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <Form entryCreation={entryCreation} />
      <List entries={entries}/>
     
    </div>
  )
}
export default App;

