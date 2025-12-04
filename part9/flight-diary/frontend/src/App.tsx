
import { useEffect, useState } from 'react'
//import { Form } from './components/Form'

import type { Entry } from './types'

import { getAllEntries, createEntry } from './services/entryService';


const App = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [weather, setWeather] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [comment, setComment] = useState<string>("");



  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

   const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({ date: date, weather : weather, visibility:visibility, comment:comment }).then(data => {
      setEntries(entries.concat(data))
    })
    setWeather('')
    setVisibility('')
    setDate('')
    setComment('')
  };

  

   return (
    <div>
      <h1>Welcome to my flight diary!</h1>
      <form onSubmit={entryCreation}>
        <label>date
         <input
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        />
        </label>
        <br />
         <label>weather <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)} 
        />
        </label>
        <br />
        <label>visibility <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)} 
        />
        </label>
        <br />
        <label>comment <input
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        />
        </label>
        <br />
        <button type='submit'>add</button>
      </form>
      <ul>
        {entries.map(entry =>
          <p key={entry.id}>Date: {entry.date} <br />
          Weather: {entry.weather} <br />
          Visibility: {entry.visibility} <br />
          Comment: {entry.comment} <br />
          </p>,
         
        )}
      </ul>
    </div>
  )
}

export default App;