import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import UserView from "./components/UserView";
import UserList from "./components/UserList";
import Menu from "./components/Menu";

import { useParams } from "react-router-dom";


import { useDispatch, useSelector } from 'react-redux'

import { initializeUsers } from  "./reducers/usersReducer";
import { initializeBlogs, appendBlog, increaseLike, deleteBlog } from  "./reducers/blogReducer";
import { notification } from "./reducers/notificationReducer";
import { initializeUser, userLogIn,  userLogOut } from "./reducers/userReducer";

import {
 // BrowserRouter as Router,
  Routes,
  Route,
  //Link,
  //Navigate,
  useNavigate,
  //useMatch
} from "react-router-dom"




const App = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [sortedBlogs, setSortedBlogs] = useState([]);

  const [formVisible, setFormVisible] = useState(false);

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
 // const users = useSelector(state => state.users)




  useEffect(() => {
      dispatch(initializeBlogs())
      dispatch(initializeUser())
      dispatch(initializeUsers())

    }, [dispatch])



  useEffect(() => {
    if (blogs){
        const sorted = [...blogs].sort((a, b) => b.likes - a.likes);
        setSortedBlogs(sorted)
      }
  }, [blogs]);


  const removeBlog = (blogObject) => {
    try{
      dispatch(deleteBlog(blogObject)),
      dispatch(notification(`blog was deleted`, 5, "success"))
    }
    catch{
      (dispatch(notification(`something went wrong!`, 5, "error")))
    }
  };


  const handleLike = (id) => {
    const blog = blogs.find((n) => n.id === id)
   // const changedBlog = { ...blog, likes: blog.likes + 1 };
    //console.log(users)

      dispatch(increaseLike(blog))
      dispatch(notification(`You liked the blog ${blog.title}"`, 5, "success"))
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(userLogOut())

    setUsername("");
    setPassword("");
    navigate('/')
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(userLogIn(username, password))
      setUsername("");
      setPassword("");
    } catch (exception) {
        (dispatch(notification(`something went wrong!`, 5, "error")))
    }
  };
  const addBlog = (blogObject) => {
    dispatch(appendBlog(blogObject, user));
    dispatch(notification(`You added a blog ${blogObject.title}"`, 5, "success"))
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

/*   const compareNumbers = (a, b) => {
    return b.likes - a.likes;
  }; */

  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? "none" : "" };
    const showWhenVisible = { display: formVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm addBlog={addBlog} />
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };


  return (
    <div>
      <h1>Blogs!</h1>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <Menu user = {user.username} handleLogout = {handleLogout}/>
        </div>
      )}
      <Routes>UsersList
        <Route path="/users/:id" element={<UserView id = {useParams()}/>} />
        <Route path="/users" element={<UserList/>} />

        <Route path="/" element={<div>
          {blogForm()}
          <h2>Blogs</h2>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                deleteBlog={removeBlog}
                currentUser={user}
              />
            ))}
          </div>} />
    </Routes>
    </div>
  );
};

export default App;
