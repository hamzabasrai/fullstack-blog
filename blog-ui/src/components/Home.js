import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from 'emotion';

import { logoutUser } from '../reducers/userReducer';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';
import BlogList from './BlogList';

const Home = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
        <Togglable buttonLabel="Add Blog">
          <AddBlogForm />
        </Togglable>
        <BlogList />
      </div>
    </>
  );
};

export default Home;
