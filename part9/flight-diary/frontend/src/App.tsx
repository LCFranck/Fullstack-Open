
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

    const [errorMessage, setErrorMessage] = useState <string>("");



  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

   const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({ date: date, weather : weather, visibility:visibility, comment:comment }).then(data => {
      setEntries(entries.concat(data))
      setWeather('')
      setVisibility('')
      setDate('')
      setComment('')
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
      <form onSubmit={entryCreation}>
        <label>date
         
      <input type="date" value={date} onChange={(e) => setDate(e.target?.value)} />
        </label>
        <br />
         <label>weather <input
          type="radio"
          name="weather"
          onChange={() => setWeather('sunny')}
        />
        sunny
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather('rainy')}
        />
        rainy
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather('cloudy')} 
        />
        cloudy
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather('stormy')} 
        />
        stormy
        <input
          type="radio"
          name="weather"
          onChange={() => setWeather('windy')} 
        />
        windy
        </label>
        <br />
        <label>visibility <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility('great')}
        />
        great
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility('good')}
        />
        good
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility('ok')}
        />
        ok
        <input
          type="radio"
          name="visibility"
          onChange={() => setVisibility('poor')}
        />
        poor
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
//THIS LOOKS VERY BAD
export default App;

