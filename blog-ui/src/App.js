import React, { useEffect } from 'react';
import { css } from 'emotion';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import { getUser } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
import ProtectedRoute from './components/ProtectecdRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div
      className={css`
        padding: 3% 5%;
      `}>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
