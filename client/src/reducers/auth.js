import {
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
    case LOAD_USER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
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
