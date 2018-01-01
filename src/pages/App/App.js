import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Header,
  ContentContainer,
} from '../../components';


export default class App extends Component {
  render () {
    console.log(this.props);
    return (
      <div>
        <Header />
        <ContentContainer>
          <Switch>
            {this.props.routes.map((route, i) => (
              <Route
                key={i}
                exact={route.exact || false}
                path={route.path}
                isLoggedIn={route.isLoggedIn}
                render={props => (
                  <route.component
                    {...this.props}
                    {...props}
                    routes={route.routes}
                  />
                )}
              />
            ))}
          </Switch>
        </ContentContainer>
      </div>
    );
  }
}
