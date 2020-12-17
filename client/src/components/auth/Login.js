import React, { Fragment } from 'react';

const Login = () => {
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
            <a href='api/auth/google' className='btn btn-primary login-btn'>
              Sign in with Google
            </a>
            <a href='api/auth/github' className='btn large btn-primary login-btn'>
              Sign in with Github
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
