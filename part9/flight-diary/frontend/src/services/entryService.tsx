import axios from 'axios';
import type { Entry, NewEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<Entry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = async (object: NewEntry) => {
  try{
    const response = await axios.post<Entry>(baseUrl, object)
    console.log("I making an entry");
    return response.data
    
} catch (error: unknown){
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response?.data);   
    } else {
      console.error(error);
    }
    throw error;
  }
  
}

