import React from 'react';
import styles from './style.scss';

const Container = props => (
  <div className={styles.root}>
    {props.children}
  </div>
);

export default Container;

