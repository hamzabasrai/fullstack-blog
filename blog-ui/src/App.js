import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import loginService from './services/loginService';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUser(user);
    }
  }, []);

  const handleNameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Invalid credentials');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <div
      className={css`
        padding: 5% 5%;
      `}
    >
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
        className={css`
          color: red;
          text-align: center;
        `}
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default App;
