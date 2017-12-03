/* @flow */
/* eslint no-console: off */
/* eslint no-param-reassign: off */

import {
  createStore,
  applyMiddleware,
} from 'redux';
import rootReducer from '../reducers'

export default (
  history,
  initialState,
) => {
  const store = createStore(
    rootReducer,
    initialState,
  );

  return store;
};