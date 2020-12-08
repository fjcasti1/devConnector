import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { delAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile, loadingProfile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loadingProfile ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experienceArr={profile.experience} />
          <Education educationArr={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create a profile
          </Link>
        </Fragment>
      )}
      <div className='my-2'>
        <button className='btn btn-danger' onClick={() => dispatch(delAccount())}>
          <i className='fas fa-user-minus'></i> Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

export default Dashboard;
