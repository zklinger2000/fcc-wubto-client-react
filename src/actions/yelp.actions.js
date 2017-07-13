"use strict";
import axios from 'axios';
// import { browserHistory } from 'react-router';
import {
  YELP_SET_CURRENT_LOCATION,
  YELP_SET_CURRENT_POSITION
} from '../constants/actionTypes';
// import toastr from 'toastr';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://fcc-wubto-rest-api.herokuapp.com'
  : 'http://localhost:8050';

export function setCurrentLocation(location) {
  return {
    type: YELP_SET_CURRENT_LOCATION,
    payload: location
  };
}

export function setCurrentPosition(coords) {
  return {
    type: YELP_SET_CURRENT_POSITION,
    payload: coords
  };
}

// Find string location from coordinates
export function getCurrentLocation(coords) {
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
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function searchDefault(location) {
  return dispatch => {
    axios.post(`${API_URL}/yelp/search`, {
      location: location.display_address[1],
      categories: ['bars']
    })
      .then(response => {
        // TODO: Error checking
        const { businesses } = response.data;
        console.info(businesses);
      })
      .catch(err => {
        console.error(err);
      });
  };
}

// // AJAX call for a secure resource
// export function getPrivateResource() {
//   const userToken = localStorage.getItem('user_token');
//
//   return dispatch => {
//     axios.get(`${API_URL}/private`, {
//       headers: { authorization: userToken }
//     })
//       .then(response => {
//         if (response.data) {
//           console.info(response.data);  // eslint-disable-line no-console
//         } else {
//           dispatch(authFacebookError('empty response!'));
//         }
//       })
//       .catch(err => {
//         // If request is bad...
//         dispatch(authFacebookError(err));
//         dispatch(logoutUser());
//         // Show a message saying what the error was
//         toastr.error(err.response.data, 'Error', { positionClass: 'toast-bottom-full-width' });
//       });
//   };
// }
