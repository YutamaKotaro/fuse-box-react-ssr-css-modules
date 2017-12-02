import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {
  App,
  Home,
  About,
  NotFound
} from './containers'

export default (store) => {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='*' component={NotFound} />
    </Route>
  )
}
