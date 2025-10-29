
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    createAnec(state, action) {
      state.push(action.payload)
    },
    
    vote(state, action) {
      const id = action.payload
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = { 
        ...anecToChange, 
        votes: anecToChange.votes +1
      }
      
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec 
      )
    },
    setAnecdotes(state, action) {
      return action.payload    
      }
  },
})

const { createAnec, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnec = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnec(newAnecdote))
  }
}

export const { vote } = anecdoteSlice.actions

export default anecdoteSlice.reducer

//export const { createAnec, vote, setAnecdotes } = anecdoteSlice.actions
//export default anecdoteSlice.reducer