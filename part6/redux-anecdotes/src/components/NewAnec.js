import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
  
const NewNote = () => {
    const dispatch = useDispatch()
  
    const newAnec = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createAnec(content))
    }
}
export default NewNote
