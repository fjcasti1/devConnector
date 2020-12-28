import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  DELETE_ACCOUNT,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
    case LOGOUT_SUCCESS:
    case DELETE_ACCOUNT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};
