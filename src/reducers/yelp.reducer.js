import initialState from './initialState';
import {
  YELP_SET_CURRENT_POSITION,
  YELP_SET_CURRENT_LOCATION,
  YELP_SET_PLACES,
  YELP_SET_SEARCH_TERMS
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
    default:
      return state;
  }
}
