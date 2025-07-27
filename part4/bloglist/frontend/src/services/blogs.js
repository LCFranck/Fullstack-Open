import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`,newObject)
  return request.then(response => response.data)
}

const remove = async (deleteObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(deleteObject)
  //const response = await axios.delete(baseUrl, deleteObject, config)
  const response = await axios.delete(`${baseUrl}/${deleteObject}`, config);
  return response.data
}


export default { getAll, setToken, create, update, remove }