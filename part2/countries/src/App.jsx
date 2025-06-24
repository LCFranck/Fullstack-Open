import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'


const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState('')
  const [lan, setlan] = useState({})
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [flag, setFlag] =  useState(null)
  const [newFilter, setNewFilter] = useState('un')
  const [countryList, setCountryList] = useState([])


  const countriesToShow = countryList.filter(country => country.toLowerCase().includes(newFilter.toLowerCase()))

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
 
    if (country) {
      console.log('wowwiee a country!', country)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setlan(response.data.languages)

         // setCountryData(response.data)
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

  const handleChange = (event) => {
    setValue(event.target.value)
  }

    const handleFilter = (event) =>{
    setNewFilter(event.target.value)
  }
  


  const onSearch = (event) => {
    event.preventDefault()
    setCountry(newFilter)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Find coutries: <input filter={newFilter} onChange={handleFilter} />
        <button type="submit">search</button>
      </form>
      
   
      <Content country ={country} 
      list = {countriesToShow} 
      lan = {lan}
      capital={capital}
      area={area}
      flag={flag}/>
    </div>

  )
}

export default App