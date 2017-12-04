import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';
import info from './info';

export default combineReducers({
  routing: routerReducer,
  counter,
  info,
});
