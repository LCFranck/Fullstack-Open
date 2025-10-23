
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import {  showNotification, hideNotification } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecForm = () => {
  const dispatch = useDispatch()

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    const newAnec = await anecdoteService.createNew(content)    
    dispatch(createAnec(newAnec))
    dispatch(showNotification(`You created a new anecdote!"`))
    setTimeout(() => { dispatch(hideNotification())}, 5000)
  }
     // <form onSubmit={addAnec}>
  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnec}> 
      <input name="anec" />
      <button type ="submit">create</button>
    </form>
    </div>
  )
}

export default AnecForm