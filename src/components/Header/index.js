import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import styles from './style.scss';


const ButtonAppBar = () => (
  <div className={styles.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={styles.menuButton} color="contrast" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={styles.flex}>
          Title
        </Typography>
        <Button color="contrast">Login</Button>
      </Toolbar>
    </AppBar>
  </div>
);

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ButtonAppBar;
