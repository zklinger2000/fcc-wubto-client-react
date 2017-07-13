import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth.reducer';
import yelpReducer from './yelp.reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  yelp: yelpReducer
});

export default rootReducer;
