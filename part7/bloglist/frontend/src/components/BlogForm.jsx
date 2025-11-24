import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { Button, Input } from '../styled';

const BlogForm = ({ addBlog }) => {
  const user = useSelector(state => state.user)
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
          <Input
            data-testid="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          author
          <Input
            data-testid="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
        <br />
        <label>
          url
          <Input
            data-testid="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </label>
        <br/>
        <Button type="submit">save</Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
