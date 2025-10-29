
import { useDispatch } from 'react-redux'
import { appendAnec } from '../reducers/anecdoteReducer'
import {  notification  } from '../reducers/notificationReducer'

//import anecdoteService from '../services/anecdotes'

const AnecForm = () => {
  const dispatch = useDispatch()

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    //const newAnec = await anecdoteService.createNew(content)    
    dispatch(appendAnec(content))
    dispatch(notification(`You created a new anecdote!"`, 5))
    //setTimeout(() => { dispatch(hideNotification())}, 5000)
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