import React from 'react';
import { css } from 'emotion';

const Blog = ({ blog }) => {
  return (
    <div
      className={css`
        margin: 10px 0;
      `}
    >
      <h3
        className={css`
          margin: 0;
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
