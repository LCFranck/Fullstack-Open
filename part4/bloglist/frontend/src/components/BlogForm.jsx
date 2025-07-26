import { useState } from 'react'
const BlogForm = ({ addBlog }) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title,
     author,
       url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div> 
      <h2>blogs</h2>
      <form onSubmit={blogSubmit}>
        <div>
        title
          <input
          value={title}
          onChange={event => setTitle(event.target.value)}

         />
        </div>
      <div>
        author
          <input
          value={author}
          onChange={event => setAuthor(event.target.value)}
         />
        </div>
        <div>
        url
          <input
          value={url}
          onChange={event => setUrl(event.target.value)}

         />
        </div>
      <button type="submit">save</button>
    </form> 
    </div>
  )}

export default BlogForm