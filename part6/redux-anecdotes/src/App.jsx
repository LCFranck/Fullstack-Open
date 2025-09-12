import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

/*   const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: { id }
  })
    console.log('vote', id)
  } */

 /*  const newAnec = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnec(content))
  }
  const NewNote = () => {
    const dispatch = useDispatch()
  } */

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App