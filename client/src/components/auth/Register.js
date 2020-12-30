import React, { Fragment } from 'react';
import RegisterForm from './RegisterForm';

const Register = () => {
  return (
    <Fragment>
      <div className='card login-container'>
        <div className='card-title'>
          <h1 className='lead text-primary py-1'>
            <i className='fas fa-user'></i> Create Your Account
          </h1>
        </div>
        <div className='card-action'>
          <RegisterForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
