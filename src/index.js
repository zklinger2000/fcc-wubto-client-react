/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';
import * as actions from './actions/auth.actions';
import axios from 'axios';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

/*
    This is checking for a token in localStorage and making a request to the
    database for the user's profile immediately upon app loading for our
    token based auth system.
 */
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://fcc-heroku-rest-api.herokuapp.com'
  : 'http://localhost:8050';

const userToken = localStorage.getItem('user_token');
if (userToken) {
  store.dispatch(actions.authTokenLogin(userToken));
  store.dispatch(actions.authFacebookRequestProfile());
  axios.get(`${API_URL}/me`, {
    headers: { authorization: localStorage.getItem('user_token') }
  })
    .then(response => {
      if (response.data && response.data.token) {
        store.dispatch(actions.authFacebookReceiveProfile(response.data));
      } else {
        store.dispatch(actions.authFacebookError('No user found'));
      }
    })
    .catch(err => {
      // If request is bad...
      store.dispatch(actions.authFacebookError(err));
      store.dispatch(actions.logoutUser());
    });
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
