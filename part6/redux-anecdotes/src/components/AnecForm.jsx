
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import {  showNotification, hideNotification } from '../reducers/notificationReducer'



const AnecForm = () => {
  const dispatch = useDispatch()

  const addAnec = (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    dispatch(createAnec(content))
  }

  return (
    <div>
    <h2>create new</h2>
    <form  onSubmit={() => {
        addAnec
        dispatch(showNotification(`You created a new anecdote!"`))
        setTimeout(() => { dispatch(hideNotification())}, 5000)

      }}
                              >
      <input name="anec" />
      <button type ="submit">create</button>
    </form>
    </div>
  )
}

export default AnecForm