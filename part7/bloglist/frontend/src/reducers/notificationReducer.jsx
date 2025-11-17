
import { createSlice } from '@reduxjs/toolkit'



const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
        return null
    }
  },
})

const { showNotification, hideNotification } = notificationSlice.actions

export const notification = (text, time) => {
  return async (dispatch) => {
    dispatch(showNotification(text))
    setTimeout(() => { dispatch(hideNotification())}, time*1000)
  }
}


export default notificationSlice.reducer