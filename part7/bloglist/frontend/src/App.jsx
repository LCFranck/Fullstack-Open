import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";

import { useDispatch } from 'react-redux'


import { notificationType, notification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [sortedBlogs, setSortedBlogs] = useState([]);

 // const [notifMessage, setNotification] = useState(null);   /// ändra domhä 2 raderna
 // const [notifType, setNotifType] = useState("success");

  const [formVisible, setFormVisible] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const sorted = [...blogs].sort(compareNumbers);
    setSortedBlogs(sorted);
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);

      blogService
        .getMe(user.token)
        .then(() => {
          setUser(user);
        })
        .catch(() => {
          window.localStorage.removeItem("loggedBlogAppUser");
          blogService.setToken(null);
          setUser(null);
        });
    }
  }, []);

  const removeBlog = (blogObject) => {
    console.log("deleted!!");
    blogService
      .remove(blogObject.id)
      .then(() => {
        console.log("BLog removed!")
      })
      .catch(() => {
        console.log("blog object was not removed due to unforseen circumstances?")
      });
  };
  const handleLike = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch(() => {
        console.log("something went wrong! in voting")
      });
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
    setUsername("");
    setPassword("");
    console.log(user +"här e user")
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("something went wrong in login!")
    }
  };
  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      const blogWithUser = { ...returnedBlog, user: user };
      setBlogs(blogs.concat(blogWithUser));
    });
    (dispatch(notificationType("success")),
      dispatch(notification(`You added a blog ${blogObject.title}"`, 5)))
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

  const compareNumbers = (a, b) => {
    return b.likes - a.likes;
  };

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
          <p>{user.name} logged in </p>
          <button onClick={handleLogout}>Logout </button>
          {blogForm()}
        </div>
      )}
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
    </div>
  );
};

export default App;
