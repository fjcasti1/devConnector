import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ isAuthenticated }) => {
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

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
