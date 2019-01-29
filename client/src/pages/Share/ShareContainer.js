import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MenuBar from '../../components/MenuBar/MenuBar';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <>
        <MenuBar />
        <Query query={ALL_TAGS_QUERY}>
          {({ loading, error, data }) => {
            console.log('data is:', data);
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return <Share tags={data.tags} classes={this.props.classes} />;
          }}
        </Query>
      </>
    );
  }
}

export default withStyles(styles)(ShareContainer);
