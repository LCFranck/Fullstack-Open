
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
    },
    setNotificationType(state, action) {
        console.log(action.payload)
        return action.payload
    }
  },
})

const { showNotification, hideNotification, setNotificationType } = notificationSlice.actions

export const notification = (text, time) => {
  return async (dispatch) => {
    dispatch(showNotification(text))
    setTimeout(() => { dispatch(hideNotification())}, time*1000)
  }
}

export const notificationType = (type) => {
  return async (dispatch) => {
    dispatch(setNotificationType(type))
}
}


export default notificationSlice.reducer