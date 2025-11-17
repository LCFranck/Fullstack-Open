    import axios from 'axios'
    import { useState, useEffect } from 'react'
    
   // const baseUrl = '/api/notes'

export const useResource  = (baseUrl) => {
    let token = null
    const [response, setResponse] = useState([])


    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(baseUrl)
            console.log(response.data)
            setResponse(response.data)
        } 
        getAll()
        
    }, [baseUrl]);

  /*   const setToken = newToken => {
    token = `bearer ${newToken}`
    } */

  

    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        }
        

        const res = await axios.post(baseUrl, newObject, config)
        setResponse(response.concat(res.data))        
    }
/* 
    const update = async (id, newObject) => {
        const response = await axios.put(`${ baseUrl }/${id}`, newObject)
        return response.data
    } */
    
    return [response, {create}]

}
   
export default useResource