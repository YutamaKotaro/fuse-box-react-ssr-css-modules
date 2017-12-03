import {createStore as _createStore, applyMiddleware, compose} from 'redux'
import createMiddleware from './middleware/clientMiddleware'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import reducer from './modules/reducer'
export default function createStore (history, client, data = {}) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history)

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk]
  let finalCreateStore
  if (global.__CLIENT__ && global.__DEVELOPMENT__) {
    const createLogger = require('redux-logger')
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      global.devToolsExtension ? global.devToolsExtension() : applyMiddleware(createLogger())
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore)
  }

  const store = finalCreateStore(reducer, data)

  return store
}
