import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Redirect if logged in
  // TODO: Include in useEffect
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='login-container'>
        <div className='card'>
          <div className='card-title'>
            <p className='lead'>
              <i className='fas fa-user'></i> Sign Into Your Account
            </p>
          </div>
          <div className='card-action'>
            <a href='auth/google' className='btn btn-primary login-btn'>
              Sign in with Google
            </a>
            <a href='auth/github' className='btn large btn-primary login-btn'>
              Sign in with Github
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
