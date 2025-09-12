
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'


const AnecForm = () => {
  const dispatch = useDispatch()

  const addAnec = (event) => {
    event.preventDefault()
    const content = event.target.anec.value
    event.target.anec.value = ''
    dispatch(createAnec(content))
  }

  return (
    <form onSubmit={addAnec}>
      <input name="anec" />
      <button type ="submit">create</button>
    </form>
  )
}

export default AnecForm