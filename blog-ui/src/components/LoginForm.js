import React from 'react';
import { css } from 'emotion';

const blockLabel = css`
  display: block;
`;

const LoginForm = ({
  username,
  password,
  handleNameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1>Login to view blogs</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label className={blockLabel}>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label className={blockLabel}>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className={css`
          width: 100%;
          margin: 10px 0;
        `}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
