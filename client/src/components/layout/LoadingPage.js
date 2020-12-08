import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';

const Loading = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Redirect if logged in
  // TODO: Include in useEffect
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return <Spinner />;
};

export default Loading;
