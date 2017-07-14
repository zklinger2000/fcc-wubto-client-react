import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth.reducer';
import yelpReducer from './yelp.reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  yelp: yelpReducer,
  form: formReducer
});

export default rootReducer;
