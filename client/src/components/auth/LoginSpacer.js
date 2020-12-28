import React from 'react';

const LoginSpacer = ({ text = 'or' }) => {
  return (
    <div className='login-spacer'>
      <hr className='login-spacer-hr' />
      <p className='normal login-spacer-text text-muted'>{text}</p>
      <hr className='login-spacer-hr' />
    </div>
  );
};

export default LoginSpacer;
