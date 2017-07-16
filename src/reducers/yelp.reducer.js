import initialState from './initialState';
import {
  YELP_SET_CURRENT_POSITION,
  YELP_SET_CURRENT_LOCATION,
  YELP_SET_PLACES,
  YELP_SET_SEARCH_TERMS,
  YELP_CONFIRM_REQUEST,
  YELP_CONFIRM_SUCCESS,
  YELP_CONFIRM_ERROR
} from '../constants/actionTypes';

export default function(state = initialState.yelp, action) {
  switch(action.type) {
    case YELP_SET_CURRENT_POSITION:
      return {
        ...state,
        current: Object.assign({}, state.current, {
          latitude: action.payload[0],
          longitude: action.payload[1]
        })
      };
    case YELP_SET_CURRENT_LOCATION:
      return {
        ...state,
        current: Object.assign({}, state.current, {
          address1: action.payload.address1,
          city: action.payload.city,
          state: action.payload.state,
          zip_code: action.payload.zip_code,
          country: action.payload.country,
          display_address: action.payload.display_address
        })
      };
    case YELP_SET_PLACES:
      return {
        ...state,
        places: action.payload
      };
    case YELP_SET_SEARCH_TERMS:
      return {
        ...state,
        search: action.payload
      };
    case YELP_CONFIRM_REQUEST:
      return {
        ...state,
        confirm: {
          isConfirming: true,
          id: action.payload
        }
      };
    case YELP_CONFIRM_ERROR:
    case YELP_CONFIRM_SUCCESS:
      return {
        ...state,
        confirm: {
          isConfirming: false,
          id: ''
        }
      };
    default:
      return state;
  }
}
