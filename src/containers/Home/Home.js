import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'

import {up, down} from '../../redux/modules/counter'
import config from '../../config'
// import './tesst.css'
// let styles = {};
// if (global.__CLIENT__) {
  // styles = require('./style.scss')
// }
import styles from './test.css'
// console.log(global.__CLIENT__)

@connect(
  (state) => ({
    count: state.counter.count
  }),
  {
    up, down
  }
)
export default class Home extends Component {

  render () {
    const {up, down, count} = this.props

    return (
      <div>
        <Helmet title='Home' />
        <h1 className={styles.container}>f9999</h1>
        <p>couggggfefafffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag{count}</p>
        <p>terusta</p>
        <p>
          <button onClick={() => { console.log('down')}}>Down</button>
          <button onClick={() => { console.log('up')}}>Up</button>
        </p>
      </div>
    )
  }
}
