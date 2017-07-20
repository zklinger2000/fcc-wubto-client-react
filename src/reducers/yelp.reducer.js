import initialState from './initialState';
import {
  YELP_SET_CURRENT_POSITION,
  YELP_SET_CURRENT_LOCATION,
  YELP_SET_PLACES,
  YELP_SET_SEARCH_TERMS,
  YELP_CONFIRM_REQUEST,
  YELP_CONFIRM_SUCCESS,
  YELP_CONFIRM_ERROR,
  YELP_PLACE_REQUEST,
  YELP_PLACE_SUCCESS,
  YELP_PLACE_ERROR
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
    case YELP_PLACE_REQUEST:
      return {
        ...state,
        place: {
          isLoading: true,
          id: action.payload
        }
      };
    case YELP_PLACE_SUCCESS:
      return {
        ...state,
        place: Object.assign({}, action.payload, { isLoading: false })
      };
    case YELP_PLACE_ERROR:
      return {
        ...state,
        place: {
          isLoading: false,
          id: undefined,
          name: undefined
        }
      };
    default:
      return state;
  }
}
