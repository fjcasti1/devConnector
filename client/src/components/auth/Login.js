import React, { Fragment } from 'react';
import LoginButtonProvider from './LoginButtonProvider';
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
          <LoginButtonProvider provider='google' />
          <LoginButtonProvider provider='github' name='GitHub' />
          <LoginSpacer />
          <LoginButtonProvider provider='guest' />
          <LoginSpacer />
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
