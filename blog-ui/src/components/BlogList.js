import React from 'react';
import { useSelector } from 'react-redux';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

const BlogListItem = ({ blog, index }) => {
  return (
    <div
      id={`blog-${index}`}
      className={css`
        margin: 10px 0;
        padding: 0.25em 0;
        font-size: 1.25em;
      `}>
      <Link to={`/blogs/${blog.id}`}>
        <span
          className={css`
            font-weight: bold;
          `}>
          {blog.title}
        </span>{' '}
        -{' '}
        <span
          className={css`
            font-style: italic;
          `}>
          {blog.author}
        </span>
      </Link>
    </div>
  );
};

const BlogList = () => {
  const [blogs, notification] = useSelector((state) => {
    return [
      state.blogs.sort((blog1, blog2) => blog2.likes - blog1.likes),
      state.notification,
    ];
  });

  return (
    <div>
      <p
        className={css`
          text-align: center;
        `}>
        {notification}
      </p>
      {blogs.map((blog, index) => (
        <BlogListItem index={index} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
