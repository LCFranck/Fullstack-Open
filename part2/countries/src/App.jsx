import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'


const App = () => {
  const [country, setCountry] = useState('')
  const [lan, setlan] = useState({})
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [flag, setFlag] =  useState(null)
  const [newFilter, setNewFilter] = useState('')
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
    </div>

  )
}

export default App