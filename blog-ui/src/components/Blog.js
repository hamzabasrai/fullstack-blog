import React, { useState } from 'react';
import { css } from 'emotion';

const Blog = ({ blog, updateBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const buttonLabel = detailsVisible ? 'Hide' : 'View';
  const showDetails = { display: detailsVisible ? '' : 'none' };

  const toggleDetails = () => setDetailsVisible(!detailsVisible);

  const incrementLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  return (
    <div
      className={css`
        margin: 10px 0;
        padding: 5px;
        border: thick groove goldenrod;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <div
          className={css`
            display: inline-block;
            flex: 1 0 auto;
            h3,
            h4 {
              margin: 0;
            }
          `}
        >
          <h3>{blog.title}</h3>
          <h4>by {blog.author}</h4>
        </div>
        <button
          className={css`
            margin: 0 15px;
            flex: 0 1 auto;
          `}
          onClick={toggleDetails}
        >
          {buttonLabel}
        </button>
      </div>
      <div
        style={showDetails}
        className={css`
          margin: 10px 0;
          * {
            margin: 2px 0;
          }
        `}
      >
        <h5>
          Link -{' '}
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </h5>
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: baseline;
          `}
        >
          <h5
            className={css`
              display: inline-block;
            `}
          >
            Likes - {blog.likes}
          </h5>
          <button
            className={css`
              margin: 0 10px;
            `}
            onClick={incrementLikes}
          >
            Like
          </button>
        </div>
        <h5>Submitted by - {blog.user.name}</h5>
      </div>
    </div>
  );
};

export default Blog;
