import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ profile: { education } }) => (
  <Fragment>
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
              {!edu.to ? 'Current' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))
      ) : (
        <h3 className='text-dark'>No Education Credentials</h3>
      )}
    </div>
  </Fragment>
);

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEducation;
