import { useState } from 'react'

import PropTypes from 'prop-types'


const Blog = ({ blog, handleLike, deleteBlog, currentUser }) => {

    const [showDetails, setShowDetails] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleShow = async () => {
    setShowDetails(!showDetails)
    if (currentUser && blog.user && currentUser.name === blog.user.username){
        console.log(currentUser.name + "HÄR E CURRENT USER!")
        setShowDelete(true)
    }
  }



  const handleDelete = async () => {
    deleteBlog(blog)
  }

  return(
    <div style={blogStyle} className="blog" data-testid="blog">
     {!showDetails && <div>
      {blog.title} {blog.author}
      <button onClick={handleShow}>show</button>
   </div> }
    {showDetails && <div>
      <span>Title: {blog.title}</span>
      <button onClick={handleShow}>hide</button>
      <div>Author: {blog.author}</div>
      <div>Likes: {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>URL: {blog.url}</div>
      {showDelete && <div>
        <button onClick={handleDelete}>delete</button>
        </div> }
    </div> }
   </div>

)
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,


}
export default Blog