import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')




  useEffect(() => {
    blogService.getAll().then(blogs =>
      //console.log('Fetched blogs:', blogs),
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  } 

    const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  } 

    const handleUrlChange = (event) => {
    setUrl(event.target.value)
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
     // setErrorMessage('wrong credentials')
      alert("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const addBlog = (event) => {
    event.preventDefault()
    const BlogObject =   {
    title: title,
    author: author,
    url: url,
  }
  
    blogService
      .create(BlogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  
  const blogForm = () => (
    <div> 
      <h2>blogs</h2>
   
      <form onSubmit={addBlog}>
        <div>
        title
          <input
          value={title}
          onChange={handleTitleChange}
         />
        </div>
      <div>
        author
          <input
          value={author}
          onChange={handleAuthorChange}
         />
        </div>
        <div>
        url
          <input
          value={url}
          onChange={handleUrlChange}
         />
        </div>
      <button type="submit">save</button>
    </form> 
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} 
    </div>
  )
  


 


return (
    <div>
      <h1>Blogs</h1>
      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in  </p>
        <button onClick={handleLogout}>Logout </button>
        {blogForm()}
      </div>
    } 

    </div>
  )
}


export default App