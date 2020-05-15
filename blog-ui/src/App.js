import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { getUser, loginUser, logoutUser } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const [user, notification] = useSelector((state) => {
    return [state.user, state.notification];
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleNameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(setNotification('Invalid Credentials', 5));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className={css`
        padding: 3% 5%;
      `}>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleNameChange={handleNameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      ) : (
        <Home name={user.name} handleLogout={handleLogout} />
      )}
      <p
        id="error-msg"
        className={css`
          color: red;
          text-align: center;
        `}>
        {notification}
      </p>
    </div>
  );
}

export default App;
