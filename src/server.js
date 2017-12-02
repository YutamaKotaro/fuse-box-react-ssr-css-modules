import path from 'path'
import http from 'http'
import Express from 'express'
import compression from 'compression'
import httpProxy from 'http-proxy'
import React from 'react'
import ReactDOM from 'react-dom/server'
import {match} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import {Provider} from 'react-redux'

import Html from './helpers/Html'
import createStore from './redux/create'
import getRoutes from './routes'
import config from './config'

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort
const app = Express()
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
})

const statics = path.resolve('./build/public');
app.use(Express.static(statics));

app.use(compression())

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'})
})

app.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head)
})

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'})
  }

  json = {error: 'proxy_error', reason: error.message}
  res.end(JSON.stringify(json))
})

app.use((req, res) => {
  console.log(req.url)
  const memoryHistory = createHistory(req.originalUrl)
  const store = createStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  function hydrateOnClient () {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html store={store} />))
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', error)
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      loadOnServer({...renderProps, store}).then(() => {
        const component = (
          <Provider store={store} key='provider'>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        global.navigator = {userAgent: req.headers['user-agent']}
        res.status(200).send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html component={component} store={store} />))
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})
console.log(config.port)
app.listen(config.port, (err) => {
  if (err) {
    console.error(err,'fea')
  }
  console.log(`Example app listening on port ${config.port}`)
})
