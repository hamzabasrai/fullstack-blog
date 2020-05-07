import React from 'react';
import { css } from 'emotion';

const blockLabel = css`
  display: block;
  margin-block-start: 10px;
`;

const inlineBlock = css`
  display: inline-block;
  margin: 0 10px;
`;

const AddBlogForm = ({ title, author, url, handleChange, addBlog }) => {
  return (
    <div
      className={css`
        border: 1px solid black;
        padding: 10px;
        margin: 10px 0;
      `}
    >
      <h2
        className={css`
          margin: 0;
        `}
      >
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
              value={title}
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
              value={author}
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
              value={url}
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
