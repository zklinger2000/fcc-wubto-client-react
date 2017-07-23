"use strict";
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  YELP_SET_CURRENT_LOCATION,
  YELP_SET_CURRENT_POSITION,
  YELP_SET_PLACES,
  YELP_SET_SEARCH_TERMS,
  YELP_CONFIRM_REQUEST,
  YELP_CONFIRM_SUCCESS,
  YELP_CONFIRM_ERROR,
  YELP_PLACE_REQUEST,
  YELP_PLACE_SUCCESS,
  YELP_PLACE_ERROR
} from '../constants/actionTypes';
import toastr from 'toastr';
import { logoutUser } from './auth.actions';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://fcc-wubto-rest-api.herokuapp.com'
  : 'http://localhost:8050';

function setCurrentLocation(location) {
  return {
    type: YELP_SET_CURRENT_LOCATION,
    payload: location
  };
}

function setCurrentPosition(coords) {
  return {
    type: YELP_SET_CURRENT_POSITION,
    payload: coords
  };
}

function setPlaces(places) {
  return {
    type: YELP_SET_PLACES,
    payload: places
  };
}

export function setSearchTerms(formData) {
  return {
    type: YELP_SET_SEARCH_TERMS,
    payload: formData
  };
}

function confirmRequest(id) {
  return {
    type: YELP_CONFIRM_REQUEST,
    payload: id
  };
}

function confirmSuccess(data) {
  return {
    type: YELP_CONFIRM_SUCCESS,
    payload: data
  };
}

function confirmError(err) {
  return {
    type: YELP_CONFIRM_ERROR,
    payload: err
  };
}

function placeRequest(id) {
  return {
    type: YELP_PLACE_REQUEST,
    payload: id
  };
}

function placeSuccess(data) {
  return {
    type: YELP_PLACE_SUCCESS,
    payload: data
  };
}

function placeError(err) {
  return {
    type: YELP_PLACE_ERROR,
    payload: err
  };
}

// Find string location from coordinates
export function getCurrentLocation(coords, search) {
  return dispatch => {
    axios.post(`${API_URL}/yelp/search`, {
      latitude: coords[0],
      longitude: coords[1]
    })
      .then(response => {
        // TODO: Error checking
        const location = response.data.businesses[0].location;

        dispatch(setCurrentPosition(coords));
        dispatch(setCurrentLocation(location));
        dispatch(searchDefault(location, search));
        dispatch({
          type: '@@redux-form/CHANGE',
          meta: {
            form: 'yelpSearchForm',
            field: 'location',
            touch: false,
            persistentSubmitErrors: false
          },
          payload: (search && search.location || location.display_address[1])
        });
      })
      .catch(err => {
        errorHandler(err, dispatch, true);
      });
  };
}

export function searchDefault(current, search) {
  let options;

  if (search && (search.location || search.categories || search.term)) {
    options = search;
  }
  else {
    options = {
      location: current.display_address[1],
      categories: 'bars,restaurants'
    };
  }
  return dispatch => {
    options.categories = options.categories.split(',').map(c => c.trim()).toString();
    // Add search terms to localStorage
    localStorage.setItem('search_terms', JSON.stringify(options));
    // Dispatch action that adds search form data to current
    dispatch(setSearchTerms(options));
    axios.post(`${API_URL}/yelp/search`, options)
      .then(response => {
        // TODO: Error checking
        const { businesses } = response.data;
        dispatch(setPlaces(businesses));
      })
      .catch(err => {
        errorHandler(err, dispatch, true);
      });
  };
}

export function searchSubmit(formData) {
  return dispatch => {
    formData.categories = formData.categories.split(',').map(c => c.trim()).toString().toLowerCase();
    // Add search terms to localStorage
    localStorage.setItem('search_terms', JSON.stringify(formData));
    // Dispatch action that adds search form data to current
    dispatch(setSearchTerms(formData));
    axios.post(`${API_URL}/yelp/search`, {
      location: formData.location,
      categories: formData.categories,
      term: formData.term
    })
      .then(response => {
        // TODO: Error checking
        const { businesses } = response.data;
        dispatch(setPlaces(businesses));
      })
      .catch(err => {
        errorHandler(err, dispatch, true);
      });
  };
}

export function toggleConfirmPlace(place, isConfirming) {
  return dispatch => {
    if (isConfirming) return;

    const userToken = localStorage.getItem('user_token');

    dispatch(confirmRequest(place.id));

    axios.post(`${API_URL}/yelp/confirm/${place.id}`, { place: { id: place.id, name: place.name, image_url: place.image_url } }, {
      headers: { authorization: userToken }
    })
      .then(response => {
        // TODO: Error checking
        dispatch(confirmSuccess(response.data));
      })
      .catch(err => {
        errorHandler(err, dispatch, true);
      });
  };
}

export function getPlaceById(id) {
  return dispatch => {
    dispatch(placeRequest(id));
    axios.get(`${API_URL}/yelp/place/${id}`)
      .then(response => {
        // TODO: Error checking
        dispatch(placeSuccess(response.data));
      })
      .catch(err => {
        dispatch(placeError(err));
        errorHandler(err, dispatch, true);
      });
  };
}

function errorHandler(err, dispatch, debug) {
  let name, message = '';

  if (err.response && err.response.data) {
    name = err.response.data.name;
    message = err.response.data.message;
  }
  else {
    name = message = err;
  }

  if (debug) {
    console.log('name:', name); // eslint-disable-line no-console
    console.log('message:', message); // eslint-disable-line no-console
    // console.log('config:', err.config); // eslint-disable-line no-console
    // console.log('status:', err.response.status);  // eslint-disable-line no-console
  }

  dispatch(confirmError(err));

  switch(name) {
    case 'JsonWebTokenError':
      toastr.error(message, 'Error', { positionClass: 'toast-bottom-full-width' });
      browserHistory.push('/logout');
      break;
    case 'TokenExpiredError':
      dispatch(logoutUser());
      browserHistory.push('/expired');
      break;
    case 'INVALID_CATEGORY':
    case 'LOCATION_NOT_SPECIFIED':
    case 'LOCATION_NOT_FOUND':
      toastr.info(message, '', { positionClass: 'toast-top-right' });
      break;
    default:
      break;
  }
}
