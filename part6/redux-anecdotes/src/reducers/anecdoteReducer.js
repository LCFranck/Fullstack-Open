
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
      const updatedAnec = action.payload
      return state.map(anec =>
        anec.id !== updatedAnec.id ? anec : updatedAnec
      ) 
    },
    setAnecdotes(state, action) {
      return action.payload    
      }
  },
})

const { createAnec, setAnecdotes, vote } = anecdoteSlice.actions

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

export const increaseVote = (anec) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anec.id)
    console.log(anec.id, "this was the id voted for hmmm")
    dispatch(vote(updatedAnecdote))
  }
}



//export const { vote } = anecdoteSlice.actions

export default anecdoteSlice.reducer

//export const { createAnec, vote, setAnecdotes } = anecdoteSlice.actions
//export default anecdoteSlice.reducer