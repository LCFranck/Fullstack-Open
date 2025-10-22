import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: noteReducer,
    filter: filterReducer
  }
})

export default store