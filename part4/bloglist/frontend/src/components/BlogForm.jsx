import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
     author: author,
      url:  url
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

  BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm