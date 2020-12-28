import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_PROFILE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  const body = JSON.stringify({ name, email, password });
  dispatch({
    type: REGISTER_REQUEST,
  });
  try {
    const res = await axios.post('/api/auth/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', 3000));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredentials: true,
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert(err.response.data.message, 'danger', 3000));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  try {
    const res = await axios.get('/api/auth/user');
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    dispatch({ type: CLEAR_PROFILE });
    await axios.get('/api/auth/logout');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error(error);
  }
};
