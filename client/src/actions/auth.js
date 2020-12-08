import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_PROFILE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from './types';
import axios from 'axios';

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  try {
    const res = await axios.get('/auth/user');
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

// Logout
export const logout = (history) => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    await axios.get('/auth/logout');
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error(error);
  }
};
