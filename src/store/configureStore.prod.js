import {createStore, compose, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middlewares = [
    reduxThunk,
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  );
}
