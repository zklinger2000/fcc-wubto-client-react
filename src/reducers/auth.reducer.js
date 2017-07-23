import initialState from './initialState';
import {
  AUTH_TOKEN_LOGIN,
  AUTH_FACEBOOK_LOGOUT,
  AUTH_FACEBOOK_ERROR,
  AUTH_FACEBOOK_RECEIVE_PROFILE,
  YELP_CONFIRM_SUCCESS
} from '../constants/actionTypes';

export default function(state = initialState.auth, action) {
  switch(action.type) {
    case AUTH_TOKEN_LOGIN:
      return { ...state, authenticated: true, token: action.payload.token, error: null };
    case AUTH_FACEBOOK_LOGOUT:
      return { ...state, authenticated: false, user: {}, token: '', error: null };
    case AUTH_FACEBOOK_ERROR:
      return { ...state, error: action.payload };
    case AUTH_FACEBOOK_RECEIVE_PROFILE:
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      };
    case YELP_CONFIRM_SUCCESS:
      return {
        ...state,
        user: Object.assign({}, state.user, { friends: action.payload.friends }, { place: action.payload.place })
      };
    default:
      return state;
  }
}
