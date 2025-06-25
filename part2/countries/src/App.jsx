import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import Weather from './components/Weather'





const App = () => {
  const [country, setCountry] = useState('')
  const [lan, setlan] = useState({})
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [flag, setFlag] =  useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [countryList, setCountryList] = useState([])
  const countriesToShow = countryList.filter(country => country.toLowerCase().includes(newFilter.toLowerCase()))


  //weather part constants
  const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

  const [lat, setLat] =  useState('')
  const [long, setLong] =  useState('')
  const [temp, setTemp] =  useState('')
    const [wind,setWind] =  useState('')


  const [icon, setIcon] =  useState('')




  const getWeather = (country)=> {

    //getting coordinates
   if (country) {
      console.log('getting coordinates for', country)
      axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`)
        .then(response => {
          setLong(response.data.lon)
          setLat(response.data.lat)

        }).catch(error => {
          console.log("coordinate error")
          alert(`error getting coordinates`)
    
        })
    }

      if (country) {
      console.log('getting weather for', country)
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`)
        .then(response => {
          setTemp(response.data.main.temp)
          setWind(response.data.wind.speed)
          setIcon(response.data.weather.icon)

        }).catch(error => {
          console.log("weather error")
          alert(`error getting weather`)
    
        })
    }

  }


  useEffect(() => {
    if (capital) {
      getWeather(capital);
    }
  }, [capital]);


  useEffect(() => {

    console.log('effect run, country is now', country)
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countryNames = response.data.map(c => c.name.common)
        setCountryList(countryNames)
      })
      .catch(error => {
        alert('Error fetching country list:', error)})
      
    console.log(countriesToShow)
    }, [])

    useEffect(() => {
    
      if (countriesToShow.length === 1) {
        setCountry(countriesToShow[0]); 
      }
    }, [countriesToShow]);
      useEffect(() => {
 
    if (country) {
      console.log('wowwiee a country!', country)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setlan(response.data.languages)

          setCapital(response.data.capital)
          setArea(response.data.area)
          setFlag(response.data.flags.png)

        }).catch(error => {
          console.log("Country not found")
          alert(`No country named "${country}" found`)
          setCountry('')
          setFilter('')
        })
    }
    else {
      console.log("no country!")
    }
    
  }, [country])

 

    const handleFilter = (event) =>{
    setNewFilter(event.target.value)
  }
  

const onSelect = (selectedCountry) => {
    setCountry(selectedCountry)
    setNewFilter(selectedCountry)
  }
  const onSearch = (event) => {
    event.preventDefault()
    setCountry(filter)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Find coutries: <input value={newFilter} onChange={handleFilter} />
        
      </form>
      
   
      <Content country ={country} 
        list = {countriesToShow} 
        lan = {lan}
        capital={capital}
        area={area}
        flag={flag}
        onSearch={onSelect}
      />

      <Weather city = {capital}/>
    </div>

  )
}

export default App