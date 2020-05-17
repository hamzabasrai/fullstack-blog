import React from 'react';
import { useSelector } from 'react-redux';
import { css } from 'emotion';

import Blog from './Blog';

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
        <Blog index={index} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
