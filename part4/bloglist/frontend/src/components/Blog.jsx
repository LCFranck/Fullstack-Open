import { useState } from 'react'

import PropTypes from 'prop-types'


const Blog = ({ blog, handleLike, deleteBlog }) => {

    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleShow = async () => {
    setShowDetails(!showDetails)
  }

  const handleDelete = async () => {
    deleteBlog(blog)
  }

  return(
    <div style={blogStyle}>
     {!showDetails && <div>
      {blog.title} {blog.author}
      <button onClick={handleShow}>show</button>
   </div> }
    {showDetails && <div>
      <div>Title: {blog.title}</div>
      <button onClick={handleShow}>hide</button>
      <div>Author: {blog.author}</div>
      <div>Likes: {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>URL: {blog.url}</div>
      <button onClick={handleDelete}>delete</button>
    </div> }
   </div>

)
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,


}
export default Blog