

import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import {  notification } from '../reducers/notificationReducer'




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
                            dispatch(increaseVote(anecdote))
                            console.log("voted!")
                            dispatch(notification(`You voted for ${anecdote.content}`, 5))
                          //  setTimeout(() => { dispatch(hideNotification())}, 5000)

                        }
                        }>vote</button>
                    </div>
                    </div>
            
            )}
        </ul>)
            
  }

export default AnecList