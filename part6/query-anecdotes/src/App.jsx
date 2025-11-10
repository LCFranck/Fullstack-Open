import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useContext } from 'react'

import NotificationContext from './NotificationContext'


const App = () => {

   const queryClient = useQueryClient()
   const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({type: "NEW", payload: newAnecdote })//ändra
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })  // a new action handled by the reducer
      }, 5000)
    },
    onError:() =>{
      notificationDispatch({type: "ERROR"})//ändra
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })  // a new action handled by the reducer
      }, 5000)
    }
    })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: (anecdote.votes + 1) })
    notificationDispatch({type: "VOTE", payload: anecdote })//ändra
    setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })  // a new action handled by the reducer
      }, 5000)

    console.log('vote')
  }


  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

 
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1 
  })


  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
}

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
