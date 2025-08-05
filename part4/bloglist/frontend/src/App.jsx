import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [sortedBlogs, setSortedBlogs] = useState([])



  const [notifMessage, setNotification] = useState(null)
  const [notifType, setNotifType] = useState('success')

  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ),
    )
  }, [])

  useEffect(() => {
    const sorted = [...blogs].sort(compareNumbers);
    setSortedBlogs(sorted);
}, [blogs]);

/*   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      blogService.setToken(user.token)
    }
  }, []) */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      blogService.getMe(user.token)
        .then(() => {
          setUser(user)
        })
        .catch(() => {
          window.localStorage.removeItem('loggedBlogAppUser')
          blogService.setToken(null)
          setUser(null)
        })
    }
  }, [])

  const removeBlog = (blogObject) => {

        console.log("deleted!!")
        blogService.remove(blogObject.id).then(() => {
          setNotifType('success')
          setBlogs(blogs.filter(newBlog => newBlog.id !== blogObject.id))
          setNotification(` the blog '${blogObject.title}' was removed`)
          setTimeout(() => {setNotification(null)}, 5000)
        })
          .catch(() => {
          setNotifType('error')
          setNotification(` the blog '${blogObject.title}' was note removed, you do not have the rights or it was already removed.`)
          setTimeout(() => {setNotification(null)}, 5000)
        })

  }
  const handleLike = id => {
      const blog = blogs.find(n => n.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1 }

      blogService
        .update(id, changedBlog)
          .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        })
        .catch(() => {
          setNotifType('error')
          setNotification(` something went wrong!`)
          setTimeout(() => {setNotification(null)}, 5000)

        })
    }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')

  }
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('wrong credentials')
      setNotifType('error')
      setNotification(` Wrong username or password!`)
      setTimeout(() => {setNotification(null)}, 5000)

    }
  }
  const addBlog = (blogObject) => {

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

      })

      setNotifType('success'),
        setNotification(`blog was added!`),
        setTimeout(() => {setNotification(null)}, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

const compareNumbers= (a, b) => {
  return b.likes - a.likes
}




  const blogForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm addBlog={addBlog}/>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

return (
    <div>
      <h1>Blogs!</h1>
      <Notification message={notifMessage} type={notifType}/>
      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in  </p>
        <button onClick={handleLogout}>Logout </button>
        {blogForm()}
      </div>
      }
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={removeBlog} />
      )}
    </div>
  )
}



export default App