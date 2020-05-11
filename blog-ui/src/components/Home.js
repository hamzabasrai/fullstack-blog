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

  const sortByLikes = (blog1, blog2) => blog2.likes - blog1.likes;

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blog);
      const newBlogs = blogs.concat(newBlog);
      setBlogs(newBlogs);
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
      newBlogs.sort(sortByLikes);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
      setNotification('Failed to update blog');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const removeBlog = async (blogToDelete) => {
    try {
      await blogService.remove(blogToDelete.id);
      const newBlogs = blogs
        .filter((blog) => blog.id !== blogToDelete.id)
        .sort(sortByLikes);
      setBlogs(newBlogs);
      setNotification(
        `Deleted ${blogToDelete.title} by ${blogToDelete.author}`
      );
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.log(error);
      setNotification('Failed to delete blog');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await blogService.getAll();
        blogData.sort(sortByLikes);
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
        `}>
        <div
          className={css`
            flex: 1 0 auto;
          `}>
          <h1
            className={css`
              margin: 0;
            `}>
            Blogs
          </h1>
          <h5
            className={css`
              margin: 0;
            `}>
            {name} is logged in
          </h5>
        </div>
        <button
          className={css`
            flex: 0 1 auto;
          `}
          onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin: 5px 0;
        `}>
        <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
          <AddBlogForm createBlog={createBlog} />
        </Togglable>
        <div>
          <p
            className={css`
              text-align: center;
            `}>
            {notification}
          </p>
          {blogs.map((blog, index) => (
            <Blog
              index={index}
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
