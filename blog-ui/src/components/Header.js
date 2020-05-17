import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from 'emotion';

import { logoutUser } from '../reducers/userReducer';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  return user === null ? null : (
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
            {user.name} is logged in
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
    </>
  );
};

export default Header;
