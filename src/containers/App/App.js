import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';

injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
`;

const Header = styled.header`
  padding: 20px;
  background: ${props => (props.dark ? '#333' : '#eee')};
  color: ${props => (props.dark ? '#fff' : '#000')};
`;

const Footer = styled(Header)`
  background: #ccc;
`;

const NavItem = styled(Link)`
  padding: 4px;
  background: #333;
  color: #fff;
  margin-right: 5px;
  &:hover {
    background: #555;
    color: #ccc;
  }
`;

@connect(
  state => ({
    info: state,
  }),
  {},
)
export default class App extends Component {
  render () {
    console.log(this.props);
    return (
      <Container>
        <Header>
          <nav>
            <NavItem to="/">Homeaaaaaaaaaaaaa</NavItem>
            <NavItem to="/about">About</NavItem>
          </nav>
        </Header>
        <Content>
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
        </Content>
        <Footer />
      </Container>
    );
  }
}
