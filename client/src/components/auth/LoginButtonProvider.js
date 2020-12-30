import React from 'react';

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
      <i className={`${iconClass} fa-lg login-btn-icon`}></i>
      <span className='login-btn-text'>
        <span className='hide-md'>{continueText}</span> {name}
      </span>
    </a>
  );
};

export default LoginButtonProvider;
