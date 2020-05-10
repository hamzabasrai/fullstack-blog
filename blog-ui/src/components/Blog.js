import React, { useState } from 'react';
import { css } from 'emotion';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const user = JSON.parse(window.localStorage.getItem('currentUser'));

  const buttonLabel = detailsVisible ? 'Hide' : 'View';
  const showDetails = { display: detailsVisible ? '' : 'none' };

  const toggleDetails = () => setDetailsVisible(!detailsVisible);

  const incrementLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const showDelete = {
    display: user.username === blog.user.username ? '' : 'none',
  };

  const deleteBlog = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog);
    }
  };

  return (
    <div
      className={css`
        margin: 10px 0;
        padding: 5px;
        border: thick groove goldenrod;
      `}>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}>
        <div
          className={css`
            display: inline-block;
            flex: 1 0 auto;
            h3,
            h4 {
              margin: 0;
            }
          `}>
          <h3 id="title">{blog.title}</h3>
          <h4 id="author">by {blog.author}</h4>
        </div>
        <button
          className={css`
            margin: 0 15px;
            flex: 0 1 auto;
          `}
          onClick={toggleDetails}>
          {buttonLabel}
        </button>
      </div>
      <div
        id="details"
        style={showDetails}
        className={css`
          display: flex;
          flex-direction: column;
          margin: 10px 0;
          * {
            margin: 2px 0;
          }
        `}>
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
            align-items: center;
          `}>
          <h5
            className={css`
              display: inline-block;
            `}>
            Likes - {blog.likes}
          </h5>
          <button
            className={css`
              margin: 0 10px;
              padding: 0.25em 1.2em;
              border: 0.1em solid #000000;
              border-radius: 0.25em;
              color: #ecf0f1;
              transition: all 0.2s;
              background-color: #3498db;
              &:hover {
                color: #ffffff;
                background-color: #2980b9;
              }
            `}
            onClick={incrementLikes}>
            Like
          </button>
        </div>
        <h5>Submitted by - {blog.user.name}</h5>
        <button
          style={showDelete}
          className={css`
            align-self: center;
            padding: 0.35em 1.2em;
            border: 0.1em solid #000000;
            border-radius: 0.25em;
            color: #ecf0f1;
            transition: all 0.2s;
            background-color: #95a5a6;
            &:hover {
              color: #ffffff;
              background-color: #e74c3c;
            }
          `}
          onClick={deleteBlog}>
          Delete Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
