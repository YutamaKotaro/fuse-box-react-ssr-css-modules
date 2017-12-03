import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes'

const Root = ({store, history}) => {
  return (
    <Provider store={store} key='provider'>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
