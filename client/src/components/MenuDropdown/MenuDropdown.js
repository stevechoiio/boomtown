import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { LOGOUT_MUTATION } from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { ViewerContext } from '../../context/ViewerProvider';
class MenuDropdown extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <ViewerContext.Consumer>
            {({ viewer, loading }) => {
              return (
                <>
                  <Link to={`/profile/${viewer.id}`}>
                    <MenuItem onClick={() => {}}>
                      <i className="fas fa-fingerprint" /> &nbsp;&nbsp;Your
                      Profile
                    </MenuItem>
                  </Link>
                </>
              );
            }}
          </ViewerContext.Consumer>

          <Mutation mutation={LOGOUT_MUTATION}>
            {(logout, { data }) => (
              <MenuItem
                onClick={e => {
                  e.preventDefault();
                  logout();
                  window.location.reload();
                }}
              >
                <i className="fas fa-power-off" />&nbsp;&nbsp;Sign Out
              </MenuItem>
            )}
          </Mutation>
        </Menu>
      </div>
    );
  }
}
MenuDropdown.propTypes = {};

export default MenuDropdown;
