
import PropTypes from "prop-types";
import { Box, StyledLink } from '../styled';




const Blog = ({ blog }) => {


  return (
    <Box>
    <div  className="blog" data-testid="blog">
          <StyledLink to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
          </StyledLink>
    </div>
    </Box>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
