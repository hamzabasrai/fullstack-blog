import React, { useEffect } from 'react';
import { css } from 'emotion';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { getUser } from './reducers/userReducer';

function App() {
  const dispatch = useDispatch();

  const [user, notification] = useSelector((state) => {
    return [state.user, state.notification];
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div
      className={css`
        padding: 3% 5%;
      `}>
      {user === null ? <LoginForm /> : <Home />}
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
