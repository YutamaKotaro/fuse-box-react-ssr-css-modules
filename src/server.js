import path from 'path';
import Express from 'express';
import compression from 'compression';
import httpProxy from 'http-proxy';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import {
  StaticRouter,
} from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import routes from './routes';
import Html from './helpers/Html';
import createStore from './redux/create';
import config from './config';

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const app = Express();
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true,
});

const statics = path.resolve('./build/public');
app.use(Express.static(statics));

app.use(compression());

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` });
});

app.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json = {};
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  const history = createHistory();
  const memoryHistory = createHistory(req.originalUrl);

  const store = createStore(memoryHistory);

  const renderHtml = (_store, htmlContent) => {
    const html = renderToString(
      <Html
        store={_store}
        htmlContent={htmlContent}
      />,
    );

    return `<!doctype html>${html}`;
  };

  const branch = matchRoutes(routes, req.url);

  const redirectUrl = branch.filter(({ route }) => route.component.getRedirectUrl).map(({
    route,
    match,
  }) => route.component.getRedirectUrl(store.getState(), branch[branch.length - 1].route, match.params, queryString.parse(url.parse(match.url).query))).filter(location => location);

  if (redirectUrl.length !== 0) {
    res.redirect(302, redirectUrl[0]);
  }

  const routerContext = {};
  const htmlContent = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={routerContext}
      >
        <div>hello</div>
      </StaticRouter>
    </Provider>,
  );

  console.log(redirectUrl);
  const status = routerContext.status === '404' ? 404 : 200;
  res.status(status).send(renderHtml(store, htmlContent));
});
app.listen(config.port, (err) => {
  if (err) {
    console.log(`Error ${e}`);
  }
  console.log(`Example app listening on port ${config.port}`);
});
