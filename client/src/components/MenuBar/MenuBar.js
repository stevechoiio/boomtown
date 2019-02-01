import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import MenuDropdown from '../MenuDropdown/MenuDropdown';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const ButtonAppBar = props => {
  const { classes, history } = props;

  const viewToggle = history.location.pathname === '/share';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <Link to="/items">
              <img src="../../images/boomtown.svg" alt="B" />
            </Link>
          </IconButton>

          {!viewToggle ? (
            <Button color="inherit">
              <Link to="/share">
                <i className="fas fa-plus-circle" />Share an Item{' '}
              </Link>
            </Button>
          ) : (
            ''
          )}

          <MenuDropdown />
        </Toolbar>
      </AppBar>
    </div>
  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonAppBar));
