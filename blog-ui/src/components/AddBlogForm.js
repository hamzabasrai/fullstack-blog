import React, { useState } from 'react';
import { css } from 'emotion';

const blockLabel = css`
  display: block;
  margin-block-start: 10px;
`;

const inlineBlock = css`
  display: inline-block;
  margin: 0 10px;
`;

const AddBlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'title':
        setBlogTitle(event.target.value);
        break;
      case 'author':
        setBlogAuthor(event.target.value);
        break;
      case 'url':
        setBlogUrl(event.target.value);
        break;
      default:
        break;
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blog = { title: blogTitle, author: blogAuthor, url: blogUrl };
    createBlog(blog);
    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
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
            <input
              type="text"
              name="title"
              id="title"
              value={blogTitle}
              onChange={handleChange}
            />
          </div>
          <div className={inlineBlock}>
            <label className={blockLabel} htmlFor="author">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={blogAuthor}
              onChange={handleChange}
            />
          </div>
          <div className={inlineBlock}>
            <label className={blockLabel} htmlFor="url">
              URL
            </label>
            <input
              type="text"
              name="url"
              id="url"
              value={blogUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={inlineBlock}>
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
