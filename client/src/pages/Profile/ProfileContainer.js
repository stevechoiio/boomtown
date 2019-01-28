import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { withRouter } from 'react-router-dom';
class ProfileContainer extends Component {
  render() {
    return (
      <Query
        variables={{ id: this.props.match.params.id }}
        query={ALL_USER_ITEMS_QUERY}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          const { user } = data;
          return <Profile user={user} />;
        }}
      </Query>
    );
  }
}

export default withRouter(ProfileContainer);
