import React, { Component } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import '../styles/reset.css'

export default class Html extends Component {
  render () {
    const { assets, component, store, css } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState())}` }} charSet="UTF-8" />
          <script src="js/bundle.js" charSet="UTF-8" />
          <style id="jss-server-side">{css}</style>
        </body>
      </html>
    );
  }
}
