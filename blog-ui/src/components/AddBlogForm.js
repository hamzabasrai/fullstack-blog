import React from 'react';
import { css } from 'emotion';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const blockLabel = css`
  display: block;
  margin-block-start: 10px;
`;

const inlineBlock = css`
  display: inline-block;
  margin: 0 10px;
`;

const AddBlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useField('text');
  const [author, setAuthor] = useField('text');
  const [url, setURL] = useField('url');

  const addBlog = (event) => {
    event.preventDefault();
    const blog = { title: title.value, author: author.value, url: url.value };
    dispatch(createBlog(blog))
      .then(() => {
        dispatch(setNotification(`Added '${blog.title}' by ${blog.author}`));
        setTitle('');
        setAuthor('');
        setURL('');
      })
      .catch(() => {
        dispatch(setNotification('Error - Unable to create blog'));
      });
  };

  return (
    <div
      className={css`
        border: 1px solid black;
        padding: 10px;
        margin: 10px 0;
      `}>
      <h2
        className={css`
          margin: 0;
        `}>
        Add a Blog
      </h2>
      <div>
        <form onSubmit={addBlog}>
          <div className={inlineBlock}>
            <label className={blockLabel} htmlFor="title">
              Title
            </label>
            <input name="title" id="title" {...title} />
          </div>
          <div className={inlineBlock}>
            <label className={blockLabel} htmlFor="author">
              Author
            </label>
            <input name="author" id="author" {...author} />
          </div>
          <div className={inlineBlock}>
            <label className={blockLabel} htmlFor="url">
              URL
            </label>
            <input name="url" id="url" {...url} />
          </div>
          <button id="add-blog-submit" type="submit" className={inlineBlock}>
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
