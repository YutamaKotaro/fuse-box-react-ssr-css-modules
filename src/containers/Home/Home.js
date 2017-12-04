import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styles from './test.css';

export default class Home extends Component {
  render () {
    const {
      counter: {
        count,
      },
      counterActions,
    } = this.props;

    console.log(this.props, 'Home');
    return (
      <div>
        <Helmet title="Home" />
        <h1 className={styles.container}>fjjll</h1>
        <p>coun:{count}</p>
        <p>
          <button onClick={counterActions.downCounter}>Down</button>
          <button onClick={counterActions.upCounter}>Up</button>
        </p>
      </div>
    );
  }
}
