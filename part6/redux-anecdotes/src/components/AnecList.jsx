

import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

/* const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
} */

const AnecList = () => {
    const anecdotes = useSelector(state => state)

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)


    const dispatch = useDispatch()

    return(
        <ul>
            {sortedAnecdotes.map(anecdote =>
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
        </ul>
            )
    }

export default AnecList