import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Helmet from 'react-helmet';
import styles from './test.css';
import assets from '../../assets';

export default class Home extends Component {
  render () {
    const {
      counter: {
        count,
      },
      counterActions,
    } = this.props;

    return (
      <div>
        <Helmet title="Home" />
        <h1 className={styles.container}>fjjll</h1>
        <p>coun:{count}</p>
        <p>
          <Button>Default</Button>
          <img src={assets.SMALL} alt="smaill" />
          <img src={assets.LARGE} alt="big" />
          <button onClick={counterActions.downCounter}>Down</button>
          <button onClick={counterActions.upCounter}>Up</button>
        </p>
      </div>
    );
  }
}
