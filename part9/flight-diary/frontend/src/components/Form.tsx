import { useState } from 'react';
import type { NewEntry } from '../types';

interface Props {
  entryCreation: (entry: NewEntry) => void;
}

const Form = ({ entryCreation }: Props) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const onCreate = (event: React.SyntheticEvent) => {
    event.preventDefault();
    entryCreation({ date, weather, visibility, comment });
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <form onSubmit={onCreate}>
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
  );
};

export default Form;
