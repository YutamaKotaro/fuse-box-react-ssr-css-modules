import React, { Component } from 'react';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './actions/counter';
import routes from './routes';

class App extends Component {
  componentDidUpdate() {
    // const { pathname: currentPathname } = this.props.location;
    // const { pathname: prevPathname } = prevProps.location;
    // const isChangedPathname = currentPathname !== prevPathname;
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
  router: state.router,
  counter: state.counter,
});
const mapDispatchToProps = dispatch => ({
  counterActions: bindActionCreators(counterActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
