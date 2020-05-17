import React from 'react';
import { css } from 'emotion';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Blogs from './views/Blogs';
import Users from './views/Users';

function App() {
  return (
    <div
      className={css`
        padding: 3% 5%;
      `}>
      <Switch>
        <ProtectedRoute path="/users" component={Users} />
        <ProtectedRoute path="/blogs" component={Blogs} />
        <Route path="/login" component={Login} />
        <Route path="*" render={() => <Redirect to="/blogs" />} />
      </Switch>
    </div>
  );
}

export default App;
