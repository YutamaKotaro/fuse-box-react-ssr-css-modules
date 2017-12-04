/* @flow */
/* eslint no-console: off */
/* eslint no-param-reassign: off */

import {
  createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import env from '../utils/env';
import rootReducer from '../reducers';

const middleware = [];

if (env === 'development') {
  middleware.push(logger);
}

export default (
  history,
  initialState,
) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );

  return store;
};
