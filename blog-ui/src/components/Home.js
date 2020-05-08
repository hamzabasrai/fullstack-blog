import React, { useEffect, useState, createRef } from 'react';
import { css } from 'emotion';
import blogService from '../services/blogService';
import Blog from './Blog';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const Home = ({ name, handleLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [notification, setNotification] = useState(null);

  const blogFormRef = createRef();

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

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      blogFormRef.current.toggleVisibility();
      const blog = { title: blogTitle, author: blogAuthor, url: blogUrl };
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      setNotification(`Added '${newBlog.title}' by ${newBlog.author}`);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.log(error);
      setNotification('Failed to add new blog');
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
          <AddBlogForm
            title={blogTitle}
            author={blogAuthor}
            url={blogUrl}
            handleChange={handleChange}
            addBlog={addBlog}
          />
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
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
