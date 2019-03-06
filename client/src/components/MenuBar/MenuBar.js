import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import logo from '../../images/boomtown.svg';
import Slide from '@material-ui/core/Slide';
import styles from './styles';

const ButtonAppBar = props => {
  const { classes, history, location } = props;

  const viewToggle = history.location.pathname === '/share';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <IconButton>
              <Link to="/items">
                <img src={logo} className={classes.logo} />
              </Link>
            </IconButton>
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              {' '}
              {!viewToggle ? (
                <Slide
                  direction="left"
                  in={location.pathname !== '/share'}
                  unmountOnExit
                >
                  <Button size="small">
                    <Link to="/share" className={classes.menuButton}>
                      <i className="fas fa-plus-circle" /> &nbsp;Share an Item{' '}
                    </Link>
                  </Button>
                </Slide>
              ) : (
                ''
              )}
              <MenuDropdown className={classes.menuButton} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonAppBar));
