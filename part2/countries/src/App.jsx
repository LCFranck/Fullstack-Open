import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [country, setCountry] = useState('Finland')
  const [lan, setlan] = useState({})
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [countryList, setCountryList] = useState({})


function exists(node) {
  return node === document.body ? false : document.body.contains(node);
}



  useEffect(() => {
    console.log('effect run, currency is now', country)

    // skip if currency is not defined
    if (country) {
      console.log('wowwiee a country!')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setlan(response.data.languages)
          setCapital(response.data.capital)
          setArea(response.data.area)
        }).catch(error => {
          console.log("Country not found")
          alert(`No country named "${country}" found`)
        })
    }
    else {
      alert("not a country!")
      setCountry(null)
    }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Find coutries: <input value={value} onChange={handleChange} />
        <button type="submit">search</button>
      </form>
      
      <h1> {country} </h1>
      <p>
        Capital: {capital} </p>
      <p> 
        area: {area}
      </p>
      <pre>
        {JSON.stringify(lan, null, 2)}
      </pre>
    </div>
  )
}

export default App