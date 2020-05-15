import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { getUser, loginUser, logoutUser } from './reducers/userReducer';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleNameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
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
        {errorMessage}
      </p>
    </div>
  );
}

export default App;
