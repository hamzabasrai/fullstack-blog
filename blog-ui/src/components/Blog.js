import React from 'react';
import { css } from 'emotion';

const Blog = ({ blog }) => {
  return (
    <div>
      <h3
        className={css`
          margin-block-end: 0;
        `}
      >
        {blog.title}
      </h3>
      <h4
        className={css`
          margin: 0;
        `}
      >
        {blog.author}
      </h4>
    </div>
  );
};

export default Blog;
