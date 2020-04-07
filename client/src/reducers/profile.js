// to create reducers first need create state and then create the action

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null, // hold make request to get all profile data and one user profile
  profiles: [], // for list of developers
  repos: [], // github repose
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // first action is to get the profile
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
