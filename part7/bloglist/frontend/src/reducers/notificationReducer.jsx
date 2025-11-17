
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  message: null,
  type: null,
}
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
        state.message = action.payload.text
        state.type = action.payload.type
    },
    hideNotification(state) {
        state.message = null
        state.type =  null
    }
  },
})

const { showNotification, hideNotification } = notificationSlice.actions

export const notification = (text, time, type) => {
  return async (dispatch) => {
    dispatch(showNotification({ text, type }))
    setTimeout(() => { dispatch(hideNotification())}, time*1000)
  }
}


export default notificationSlice.reducer