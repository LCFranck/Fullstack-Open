import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ addBlog, user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogSubmit = (event) => {
    event.preventDefault();
    addBlog({
      title: title,
      author: author,
      url: url,
      user: user,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={blogSubmit}>
        <label>
          title
          <input
            data-testid="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          author
          <input
            data-testid="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <br />
        <label>
          url
          <input
            data-testid="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
