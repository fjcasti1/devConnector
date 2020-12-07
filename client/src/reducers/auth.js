import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_REQUEST:
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
    case LOGOUT:
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
}
