
import React, { useState, useEffect } from 'react'


const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
//   https://studies.cs.helsinki.fi/restcountries/name/{name} 	

export const useCountry = (filter) => {
  //  const [country, setCountry] = useState(null)

   // const [name, setName] = useState('')
    const [found, setFound] = useState(false)
    const [data, setData] = useState(null)


    useEffect(() => { 
        if (!filter) return
             
        const fetchCountry = async () => {       
            const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${filter}`)
                if (!response.ok) {
                    setFound(false)
                }
                else{
                    const json = await response.json()
                    console.log(json)
                    setData(json)
                    setFound(true)
                } 
                }
        fetchCountry()
    }, [filter]);

  

      
    return {
      //  type,
      //  value,
      //  onSearch,
        found,
        data,

    }
}


export default useCountry 
