import React, { Fragment } from 'react';
import LoginButton from './LoginButton';
import LoginForm from './LoginForm';
import LoginSpacer from './LoginSpacer';

const Login = () => {
  return (
    <Fragment>
      <div className='card login-container'>
        <div className='card-title'>
          <h1 className='lead text-primary py-1'>
            <i className='fas fa-user'></i> Sign Into Your Account
          </h1>
        </div>
        <div className='card-action'>
          <LoginButton provider='google' />
          <LoginButton provider='github' name='GitHub' />
          <LoginButton provider='facebook' />
          <LoginSpacer />
          <LoginButton provider='guest' />
          <LoginSpacer />
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
