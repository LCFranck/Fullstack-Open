import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import {  increaseLike, deleteBlog } from  "../reducers/blogReducer";

import { notification } from "../reducers/notificationReducer";

import {
  
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch
} from "react-router-dom"


const UserView = () => {

    const { id } = useParams()
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find((n) => n.id === id)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
   // const [showDelete, setShowDelete] = useState(false);
    const navigate = useNavigate()


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
         <button onClick={() => handleLike()}>like</button>
        <p>added by {blog.user?.username || "Unknown"} </p>
        {(user && blog.user && user.username === blog.user.username) && (
            <button onClick={() => handleDelete()}>delete</button>
        )
        }
        </div>
    )
}

export default UserView
