import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
         return `${action.payload.content} was succesfully created!`
    case 'VOTE':
       // console.log
         return `You voted for ${action.payload.content}`
    case 'ERROR':
         return `Too short anecdote, must be 5 letters or more!`
    case 'HIDE':
        return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
        {props.children}
    </NotificationContext.Provider>
    )
}

export default NotificationContext