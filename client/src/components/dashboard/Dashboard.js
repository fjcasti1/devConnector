import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const Dashboard = ({ getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      <h1 class='large text-primary'>Dashboard</h1>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
