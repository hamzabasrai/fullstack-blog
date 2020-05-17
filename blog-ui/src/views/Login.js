import React from 'react';
import { css } from 'emotion';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import { useHistory, Redirect } from 'react-router-dom';

const blockLabel = css`
  display: block;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [user, notification] = useSelector((state) => {
    return [state.user, state.notification];
  });
  const history = useHistory();

  const [username] = useField('text');
  const [password] = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username.value, password.value))
      .then(() => {
        history.push('/blogs');
      })
      .catch(() => {
        dispatch(setNotification('Invalid Credentials', 5));
      });
  };

  return !user ? (
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
      <p
        id="error-msg"
        className={css`
          color: red;
          text-align: center;
        `}>
        {notification}
      </p>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
