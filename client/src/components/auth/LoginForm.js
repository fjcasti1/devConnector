import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const fieldsAreFilled = email !== '' && password !== '';

    if (!fieldsAreFilled) {
      dispatch(setAlert('Please provide email & password', 'danger', 3000));
    } else {
      dispatch(login({ email, password }));
    }
  };
  return (
    <Fragment>
      <form className='form login-form' onSubmit={(e) => onSubmit(e)}>
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
        <input type='submit' className='btn btn-primary block' value='Login' />
      </form>
      <p className='my-1 text-left'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

export default LoginForm;
