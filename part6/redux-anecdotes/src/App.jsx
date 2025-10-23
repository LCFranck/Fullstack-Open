
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecForm from './components/AnecForm'
import AnecList from './components/AnecList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <VisibilityFilter/>
      <AnecList/>
      <AnecForm />
    </div>
  )
}

export default App

