
import { createSlice } from '@reduxjs/toolkit'
import loginService from "../services/login.js";
import blogService from "../services/blogs";
import { notification } from "./notificationReducer"; 



const key = "loggedBlogAppUser"

/* const initialState = {
    user:null,
    token: ""
} */

const userSlice = createSlice({
  name: 'blogs',
  initialState:null,
  reducers: {
     logOut(){
      return null
    },

    logIn(state, action) {
      return action.payload
    }
  },
})

const { logOut, logIn } = userSlice.actions



    export const initializeUser = () => {
    return async (dispatch) => {
     const loggedUserJSON = window.localStorage.getItem(key)
          if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(logIn(user))
            blogService.setToken(user.token)
          }

  }
}

    export const userLogOut = () => {
    return async (dispatch) => {
        window.localStorage.removeItem(key);
        blogService.setToken(null);
        dispatch(logOut())
    }
    }

export const userLogIn = (username, password) => {
  return async (dispatch) => {
     try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(key, JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(logIn(user))
    }
    catch (exception) {
      (dispatch(notification(`Wrong username or password!`, 5, "error")))
       console.log("something went wrong in login!!")
    }
  }
}

export default userSlice.reducer
