import React, { Component } from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { parse } from 'qs';
import routes from './routes';

class App extends Component {
  componentDidUpdate(prevProps) {
    const { pathname: currentPathname } = this.props.location;
    const { pathname: prevPathname } = prevProps.location;
    const isChangedPathname = currentPathname !== prevPathname;

  }
  render() {

    const auth = routes[0];
    console.log(this.props)
    return (
      <div>
        <Route
          render={props => (
            <auth.component
              {...this.props}
              {...props}
              routes={auth.routes}
            />
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  ...dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));