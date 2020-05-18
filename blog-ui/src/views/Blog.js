import React from 'react';
import { css, cx } from 'emotion';
import { useSelector, useDispatch } from 'react-redux';

import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import Layout from '../components/Layout';

const inlineBlock = css`
  display: inline-block;
  margin-inline-end: 10px;
`;

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [user, notification] = useSelector((state) => [
    state.users.currentUser,
    state.notification,
  ]);

  const [comment, setComment] = useField('text');

  const incrementLikes = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 })).catch(() => {
      dispatch(setNotification(`Error - Unable to like '${blog.title}'`));
    });
  };

  const showDelete = () => {
    if (user) {
      return { display: user.username === blog.user.username ? '' : 'none' };
    }
  };

  const deleteBlog = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
        .then(() => {
          dispatch(setNotification(`Deleted '${blog.title}'`));
        })
        .catch(() => {
          dispatch(setNotification(`Error - Unable to delete '${blog.title}'`));
        });
    }
  };

  const postComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment.value))
      .then(() => {
        setComment('');
      })
      .catch(() => {
        dispatch(setNotification('Error - Unable to post comment'));
      });
  };

  return !blog ? null : (
    <Layout>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          h1,
          h3 {
            margin: 0;
          }
        `}>
        <h1>{blog.title}</h1>
        <h3>by {blog.author}</h3>
        <div
          className={css`
            margin: 10px 0;
            * {
              margin: 3px 0;
            }
          `}>
          <h4>
            Link -{' '}
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </h4>
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}>
            <h4
              className={css`
                display: inline-block;
              `}>
              Likes - {blog.likes}
            </h4>
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
          <h4>Submitted by - {blog.user.name}</h4>
          <button
            style={showDelete()}
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
        <h2
          className={css`
            margin-top: 10px;
          `}>
          Comments
        </h2>
        <ul
          className={css`
            margin-block-end: 15px;
          `}>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <h4>Post Comment</h4>
        <form onSubmit={postComment}>
          <input
            className={cx(
              inlineBlock,
              css`
                min-width: 50vw;
              `
            )}
            name="comment"
            id="comment"
            {...comment}
          />
          <button id="post-comment" type="submit" className={inlineBlock}>
            Post
          </button>
        </form>
        <p
          className={css`
            align-self: center;
            color: red;
          `}>
          {notification}
        </p>
      </div>
    </Layout>
  );
};

export default Blog;
