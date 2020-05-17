import React from 'react';
import { css } from 'emotion';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Blogs from './views/Blogs';
import Blog from './views/Blog';
import Users from './views/Users';
import User from './views/User';

function App() {
  const [users, blogs] = useSelector((state) => [
    state.users.allUsers,
    state.blogs,
  ]);

  const userMatch = useRouteMatch('/users/:id');
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <div
      className={css`
        padding: 3% 5%;
      `}>
      <Switch>
        <ProtectedRoute path="/blogs/:id" component={Blog} blog={blog} />
        <ProtectedRoute path="/users/:id" component={User} user={user} />
        <ProtectedRoute path="/blogs" component={Blogs} />
        <ProtectedRoute path="/users" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="*" render={() => <Redirect to="/blogs" />} />
      </Switch>
    </div>
  );
}

export default App;
