const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}
const vote = async (id) => {
  // Read the JSON file using require
    const response = await fetch(`${baseUrl}/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    const anecdote = await response.json()
    console.log(anecdote)

    const updateResponse = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...anecdote, votes: anecdote.votes + 1})
    })

    return await updateResponse.json()

}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }

  return await response.json()
}



export default { getAll, createNew, vote }