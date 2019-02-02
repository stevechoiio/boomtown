import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import LoadingCircle from '../../components/Loading/Loading';
class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingCircle />;
          if (error) return `Error! ${error.message}`;

          return <Items items={data.items} />;
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
