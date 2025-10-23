

import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {  showNotification, hideNotification } from '../reducers/notificationReducer'




const AnecList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const anecdotesToShow = anecdotes.filter(anecdote => anecdote?.content?.toLowerCase().includes(filter.toLowerCase()))


    const sortedAnecdotes = [...anecdotesToShow].sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()


    return(
        <ul>
            {sortedAnecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes 
                        <button onClick={() => {
                            dispatch(vote(anecdote.id))
                            console.log("voted!")
                            dispatch(showNotification(`You voted for "${anecdote.content}"`))
                            setTimeout(() => { dispatch(hideNotification())}, 5000)

                        }
                        }>vote</button>
                    </div>
                    </div>
            
            )}
        </ul>)
            
  }

export default AnecList