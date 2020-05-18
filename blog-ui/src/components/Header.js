import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { css } from 'emotion';

import { logoutUser } from '../reducers/userReducer';

const linkStyle = css`
  display: inline-block;
  margin: 0 10px;
  text-decoration: none;
  &:visited {
    color: black;
  }
  &:hover {
    text-decoration: underline solid goldenrod;
  }
`;
const activeLink = css`
  text-decoration: underline solid goldenrod;
`;

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
        <div
          className={css`
            flex: 1 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          `}>
          <NavLink
            className={linkStyle}
            activeClassName={activeLink}
            to="/blogs">
            <h3>Blogs</h3>
          </NavLink>
          <NavLink
            className={linkStyle}
            activeClassName={activeLink}
            to="/users">
            <h3>Users</h3>
          </NavLink>
        </div>
        <div
          className={css`
            flex: 0 1 auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          `}>
          <h5>Signed in as {user.name}</h5>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Header;
