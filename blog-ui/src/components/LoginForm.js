import React from 'react';
import { css } from 'emotion';
import { useDispatch } from 'react-redux';

import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';

const blockLabel = css`
  display: block;
`;

const LoginForm = () => {
  const [username] = useField('text');
  const [password] = useField('password');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username.value, password.value)).catch(() => {
      dispatch(setNotification('Invalid Credentials', 5));
    });
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
      <h1>Login to view blogs</h1>
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          <label className={blockLabel}>Username</label>
          <input id="username" name="username" {...username} />
        </div>
        <div>
          <label className={blockLabel}>Password</label>
          <input id="password" name="password" {...password} />
        </div>
        <button
          id="login-button"
          type="submit"
          className={css`
            width: 100%;
            margin: 10px 0;
          `}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
