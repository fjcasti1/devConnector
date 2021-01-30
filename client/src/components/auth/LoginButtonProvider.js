import React from 'react';
import { Fragment } from 'react';

const LoginButtonProvider = ({ provider, name = null }) => {
  let continueText = '';
  let iconClass = '';
  if (!name) {
    name = provider.charAt(0).toUpperCase() + provider.toLowerCase().slice(1);
  }
  if (provider === 'guest') {
    iconClass = 'fas fa-user-circle';
    continueText = 'Continue as ';
  } else {
    iconClass = `fab fa-${provider}`;
    continueText = 'Continue with ';
  }

  return (
    <a
      href={`api/auth/${provider}`}
      className={`btn btn-primary login-btn login-btn-${provider}`}
    >
      <div className='login-btn-text'>
        <div>
          <i className={`${iconClass} login-btn-icon`}></i>
        </div>
        <div>
          {continueText} {name}
        </div>
      </div>
    </a>
  );
};

export default LoginButtonProvider;
