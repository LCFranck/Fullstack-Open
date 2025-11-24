import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";

import { Button, Input } from "../styled"

import {  increaseLike, deleteBlog, addComment } from  "../reducers/blogReducer";

import { notification } from "../reducers/notificationReducer";

import {
  useNavigate,
} from "react-router-dom"


const UserView = () => {

    const { id } = useParams()
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find((n) => n.id === id)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
   // const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate()
    const [ comment, setComment ] = useState("")


  const handleComment = async (event) => {
    event.preventDefault();
    await dispatch(addComment(blog, comment))
    console.log(comment)
    setComment("")
    }




const handleDelete = () => {
    try{
      dispatch(deleteBlog(blog)),
      dispatch(notification(`blog was deleted`, 5, "success"))
    }
    catch{
      (dispatch(notification(`something went wrong!`, 5, "error")))
    }
    navigate("/")
  };


    if (!blog){
        return (<div> Loading </div>)
    }
     const handleLike = () => {
       // const blog = blogs.find((n) => n.id === id)
          dispatch(increaseLike(blog))
          dispatch(notification(`You liked the blog ${blog.title}"`, 5, "success"))
      }

    return (
        <div>
        <h1> {blog.title} {blog.author}</h1>
         <p>{blog.likes} Likes</p>
         <Button onClick={() => handleLike()}>like</Button>
        <p>added by {blog.user?.username || "Unknown"} </p>
        {(user && blog.user && user.username === blog.user.username) && (
            <Button onClick={() => handleDelete()}>delete</Button>
        )
        }
        <h2>Comments</h2>
        <form onSubmit={handleComment}>
        <div>
          <Input
            data-testid="comment"
            type="comment"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <Button type="submit">add comment</Button>
       </form>
       <ul>
            {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
            ))}
        </ul>
        </div>
    )
}

export default UserView
