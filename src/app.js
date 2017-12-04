import React, { Component } from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import routes from './routes';

class App extends Component {
  componentDidUpdate(prevProps) {
    const { pathname: currentPathname } = this.props.location;
    const { pathname: prevPathname } = prevProps.location;
    const isChangedPathname = currentPathname !== prevPathname;
  }
  render() {
    const auth = routes[0];
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
  ...dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
