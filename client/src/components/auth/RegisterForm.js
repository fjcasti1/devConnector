import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const fieldsAreFilled =
      name !== '' && email !== '' && password !== '' && password2 !== '';

    if (!fieldsAreFilled) {
      dispatch(setAlert('Please fill all fields', 'danger', 3000));
    } else if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger', 3000));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <Fragment>
      <form className='form register-form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary register-btn register-btn-local block'
          value='Register'
        />
        <p className='register-question'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
