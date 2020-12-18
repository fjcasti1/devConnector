import React, { Fragment } from 'react';
import LoginButton from './LoginButton';

const Login = () => {
  return (
    <Fragment>
      <div className='card login-container'>
        <div className='card-title'>
          <p className='lead py-1'>
            <i className='fas fa-user'></i> Sign Into Your Account
          </p>
        </div>
        <div className='card-action'>
          <LoginButton provider='google' />
          <LoginButton provider='github' name='GitHub' />
          <LoginButton provider='facebook' />
          <p>or</p>
          <LoginButton provider='guest' />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
