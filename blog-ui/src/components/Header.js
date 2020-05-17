import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { css } from 'emotion';

import { logoutUser } from '../reducers/userReducer';

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
          align-items: center;
          border: 1px solid black;
          border-radius: 10px;
          padding: 10px;
        `}>
        <h3
          className={css`
            margin: 0;
            flex: 1 0 auto;
          `}>
          Blog App
        </h3>
        <div
          className={css`
            flex: 0 1 auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            h5 {
              margin: 0;
            }
          `}>
          <h5>Signed in as {user.name}</h5>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Header;
