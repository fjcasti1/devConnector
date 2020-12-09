import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from './Spinner';

const Landing = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return loading ? (
    <Spinner />
  ) : isAuthenticated ? (
    <Redirect to='/dashboard' />
  ) : (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from other
            developers
          </p>
          <div className='buttons'>
            <Link to='/login' className='btn btn-primary p-3'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
