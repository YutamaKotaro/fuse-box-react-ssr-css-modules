import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';

export default combineReducers({
  counter,
  router,
});
