import React, {Component} from 'react'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-connect'
import {Link} from 'react-router'
import styled, {injectGlobal} from 'styled-components'
import {isLoaded as isInfoLoaded, load as loadInfo} from '../../redux/modules/info'

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
  background: ${props => props.dark ? '#333' : '#eee'};
  color: ${props => props.dark ? '#fff' : '#000'};
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

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()))
    }
    return Promise.all(promises)
  }
}])
@connect(
  (state) => ({
    info: state.info.data
  }),
  {}
)
export default class App extends Component {
  render () {
    return (
      <Container>
        <Header>
          <nav>
            <NavItem to='/'>Homeaaaaaaaaaaaaa</NavItem>
            <NavItem to='/about'>About</NavItem>
          </nav>
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>
        </Footer>
      </Container>
    )
  }
}
