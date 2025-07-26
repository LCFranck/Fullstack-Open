import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  
    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  const handleShow = async (event) => {
    setShowDetails(!showDetails) 
  }

  return(
    <div style={blogStyle}>
     {!showDetails && <div>
      {blog.title} {blog.author}
      <button onClick={handleShow}>show</button>
   </div> } 
    {showDetails && <div>
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>Likes: {blog.likes}</div>
      <div>URL: {blog.url}</div>
      <button onClick={handleShow}>show</button>
    </div> } 
   </div> 
  
)
}
export default Blog