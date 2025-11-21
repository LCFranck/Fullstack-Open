import { useState } from "react";

import PropTypes from "prop-types";


import {

  Link,

} from "react-router-dom"

/*   <Link to={`/users/${data.id}`}>
                              {username}
                          </Link> */

const Blog = ({ blog }) => {
 // const [showDetails, setShowDetails] = useState(false);
  //const [showDelete, setShowDelete] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };


/*   const handleShow = async () => {
    setShowDetails(!showDetails);
    if (currentUser && blog.user && currentUser.username === blog.user.username) {
      console.log(currentUser.username + "HÄR E CURRENT USER!");
      setShowDelete(true);
    }
  };

  const handleDelete = async () => {
    deleteBlog(blog);
  }; */

/*   <Link to={`/users/${data.id}`}>
                              {username}
                          </Link> */

  return (
    <div style={blogStyle} className="blog" data-testid="blog">
          <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
          </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
