import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.users.currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user !== null ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
