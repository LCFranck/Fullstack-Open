
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'



const blogSlice = createSlice({
  name: 'blogs',
  initialState:[],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
     removeBlog(state, action){
      return state.filter(b => b.id !== action.payload.id)
    },

    update(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

const { createBlog, setBlogs, update, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (newBlog, user) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(createBlog({ ...createdBlog, user: user }))//to ensure the blogs immediately have a user
  }
}

export const deleteBlog = (blogToRemove) => {
  return async (dispatch) => {
    await blogService.remove(blogToRemove.id)
    dispatch(removeBlog(blogToRemove))
  }
}

export const increaseLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
     dispatch(update(updatedBlog))
    await blogService.update(blog.id, updatedBlog)
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    console.log(comment)
    const updatedBlog = { ...blog, comments: blog.comments.concat([comment]) }
    dispatch(update(updatedBlog))
    await blogService.update(blog.id, updatedBlog)
  }

}




export default blogSlice.reducer
