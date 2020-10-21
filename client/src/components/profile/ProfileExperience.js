import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ profile: { experience } }) => (
  <Fragment>
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experience.length > 0 ? (
        experience.map((exp, index) => (
          <div key={index}>
            <h3 className='text-dark'>{exp.company}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
              {!exp.to ? 'Current' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </div>
        ))
      ) : (
        <h3 className='text-dark'>No Experience Credentials</h3>
      )}
    </div>
  </Fragment>
);

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
