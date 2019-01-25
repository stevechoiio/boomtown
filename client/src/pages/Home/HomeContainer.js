import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Divider } from '@material-ui/core';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <Home classes={this.props.classes} />
      </div>
    );
  }
}
export default withStyles(styles)(HomeContainer);
