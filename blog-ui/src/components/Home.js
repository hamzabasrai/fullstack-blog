import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import blogService from '../services/blogService';
import Blog from './Blog';

const Home = ({ name }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await blogService.getAll();
        setBlogs(blogData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1
        className={css`
          margin: 0;
        `}
      >
        Blogs
      </h1>
      <h5
        className={css`
          margin: 0;
        `}
      >
        {name} is logged in
      </h5>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Home;
