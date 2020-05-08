import React, { useEffect, useState, createRef } from 'react';
import { css } from 'emotion';
import blogService from '../services/blogService';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const Home = ({ name, handleLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const blogFormRef = createRef();

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      setNotification(`Added '${newBlog.title}' by ${newBlog.author}`);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.log(error);
      setNotification('Failed to add new blog');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog);
      const newBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
      setNotification('Failed to update blog');
      setTimeout(() => setNotification(null), 3000);
    }
  };

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
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin: 5px 0;
        `}
      >
        <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
          <AddBlogForm createBlog={createBlog} />
        </Togglable>
        <div>
          <p
            className={css`
              text-align: center;
            `}
          >
            {notification}
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
