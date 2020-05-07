import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import blogService from '../services/blogService';
import Blog from './Blog';

const Home = ({ name, handleLogout }) => {
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
    <>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: baseline;
        `}
      >
        <div
          className={css`
            flex: 1 0 auto;
          `}
        >
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
        </div>
        <button
          className={css`
            flex: 0 1 auto;
          `}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Home;
