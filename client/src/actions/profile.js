import axios from 'axios';
import { setAlert } from './alert';
import {
  // PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILES_SUCCESS,
  GET_REPOS_SUCCESS,
  PROFILE_FAIL,
  CREATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_REPOS_REQUEST,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const res = await axios.get('/api/profiles/me');

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profiles');

    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by user ID
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const res = await axios.get(`/api/profiles/${userId}`);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  dispatch({ type: GET_REPOS_REQUEST });
  try {
    const res = await axios.get(`/api/profiles/github/${username}`);

    dispatch({
      type: GET_REPOS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch,
) => {
  // dispatch({ type: PROFILE_REQUEST });
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.post('/api/profiles', formData, config);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', 3000));
      });
    }
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  // dispatch({ type: PROFILE_REQUEST });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profiles/me/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', 3000));
      });
    }
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  // dispatch({ type: PROFILE_REQUEST });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profiles/me/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', 3000));
      });
    }
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const delExperience = (expID) => async (dispatch) => {
  // dispatch({ type: PROFILE_REQUEST });
  try {
    const res = await axios.delete(`/api/profiles/me/experience/${expID}`);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed '));
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const delEducation = (eduID) => async (dispatch) => {
  // dispatch({ type: PROFILE_REQUEST });
  try {
    const res = await axios.delete(`/api/profiles/me/education/${eduID}`);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed '));
  } catch (err) {
    dispatch({
      type: PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete profile & account
export const delAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
      await axios.delete('/api/users/me'); // Deletes from DB

      dispatch({ type: CLEAR_PROFILE }); // Deletes profile from state
      dispatch({ type: DELETE_ACCOUNT }); // Deletes user from state
      dispatch(setAlert('Your account has been permanently deleted', '', 5000));
    } catch (err) {
      dispatch({
        type: PROFILE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE }); // Deletes profile from state
};
