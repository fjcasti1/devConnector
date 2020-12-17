import React, { Fragment } from 'react';

const Login = () => {
  return (
    <Fragment>
      <div className='login-container'>
        <div className='card'>
          <div className='card-title'>
            <p className='lead py-1'>
              <i className='fas fa-user'></i> Sign Into Your Account
            </p>
          </div>
          <div className='card-action'>
            <a href='api/auth/google' className='btn btn-primary login-btn'>
              <span className='hide-sm'>Continue with </span>Google
            </a>
            <a href='api/auth/github' className='btn btn-primary login-btn'>
              <img src='../../../img/google.png' />
              <span className='hide-sm'>Continue with </span>GitHub
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
