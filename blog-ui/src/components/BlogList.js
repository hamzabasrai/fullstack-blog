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
        padding: 0.25em;
        border: thick groove goldenrod;
      `}>
      <Link
        className={css`
          text-decoration: none;
          h3,
          h4 {
            display: inline-block;
            margin: 0;
          }
        `}
        to={`/blogs/${blog.id}`}>
        <h3 id={`title-${index}`}>{blog.title}</h3>{' '}
        <h4 id={`author-${index}`}>- {blog.author}</h4>
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
