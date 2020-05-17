import React from 'react';
import { css } from 'emotion';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Blogs from './views/Blogs';
import Users from './views/Users';
import User from './views/User';

function App() {
  const users = useSelector((state) => state.users.allUsers);
  const match = useRouteMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return (
    <div
      className={css`
        padding: 3% 5%;
      `}>
      <Switch>
        <ProtectedRoute path="/users/:id" component={User} user={user} />
        <ProtectedRoute path="/users" component={Users} />
        <ProtectedRoute path="/blogs" component={Blogs} />
        <Route path="/login" component={Login} />
        <Route path="*" render={() => <Redirect to="/blogs" />} />
      </Switch>
    </div>
  );
}

export default App;
