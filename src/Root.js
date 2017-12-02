import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {ReduxAsyncConnect} from 'redux-connect'
import getRoutes from './routes'

const Root = ({store, history}) => {
  return (
    <Provider store={store} key='provider'>
      <Router render={(props) =>
        <ReduxAsyncConnect {...props} filter={(item) => !item.deferred} />
          } history={history} key={new Date()}>
        {getRoutes(store)}
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
