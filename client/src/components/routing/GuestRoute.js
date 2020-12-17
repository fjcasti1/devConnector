import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const GuestRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/dashboard' />
        )
      }
    />
  );
};

export default GuestRoute;
