import {
  PROFILE_REQUEST,
  PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILES_SUCCESS,
  CREATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_PROFILE,
  GET_REPOS_REQUEST,
  GET_REPOS_SUCCESS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_REQUEST:
    case GET_REPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
    case CREATE_PROFILE:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {},
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: {},
      };
    case GET_REPOS_SUCCESS:
      return {
        ...state,
        repos: payload,
        loading: false,
        error: {},
      };
    case PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
