import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILES_SUCCESS,
  CREATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_PROFILE,
  GET_REPOS_REQUEST,
  GET_REPOS_SUCCESS,
  PROFILE_FAIL,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loadingProfile: true,
  loadingProfiles: true,
  loadingRepos: true,
  error: {},
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loadingProfile: true,
      };
    // case GET_PROFILES_REQUEST:
    //   return {
    //     ...state,
    //     loadingProfiles: true,
    //   };
    case GET_REPOS_REQUEST:
      return {
        ...state,
        loadingRepos: true,
      };
    case GET_PROFILE_SUCCESS:
    case CREATE_PROFILE:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loadingProfile: false,
        error: {},
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loadingProfiles: false,
        error: {},
      };
    case GET_REPOS_SUCCESS:
      return {
        ...state,
        repos: payload,
        loadingRepos: false,
        error: {},
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loadingProfile: true,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        loadingProfile: false,
        loadingProfiles: false,
        error: payload,
      };
    default:
      return state;
  }
};
