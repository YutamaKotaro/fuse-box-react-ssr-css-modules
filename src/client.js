import process from 'process';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store';

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

const renderApp = () => {
  const App = require('./app').default;
  const store = configureStore(history, {});

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
