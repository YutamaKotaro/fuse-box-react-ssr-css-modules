import process from 'process';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store';
import env from './utils/env';


global.__CLIENT__ = true;
global.__SERVER__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

let prevLocation = {};
const dest = document.getElementById('content');
const history = createHistory();
history.listen((location) => {
  const pathChanged = prevLocation.pathname !== location.pathname;
  const hashChanged = prevLocation.hash !== location.hash;
  if (pathChanged || hashChanged) window.scrollTo(0, 0);
  prevLocation = location;
});
const initialState = window.__INITIAL_STATE__;

const renderApp = () => {
  const App = require('./app').default;

  const store = configureStore(history, initialState);

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    dest,
  );
};

renderApp();


// Custom HMR, will forcefully reload if you edit a store file or
// one listed under fullPaths - Keeps state in sync
import { setStatefulModules } from 'fuse-box/modules/fuse-hmr';

setStatefulModules((name) => {
  console.log(name, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  return true;
    return /stores/.test(name) || /client\/index/.test(name) || /rendered\/state/.test(name);
});
