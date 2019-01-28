import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ALL_user_ITEMS_QUERY } from '../../apollo/queries';
import { withStyles } from '@material-ui/core/styles';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import MenuBar from '../../components/MenuBar/MenuBar';
import styles from './styles';
import { withRouter } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
const Profile = ({ classes, id, user, history, styles }) => {
  return (
    <div>
      <MenuBar />
      <ProfileCard user={user} history={history} id={id} />
    </div>
  );
};

export default withRouter(withStyles(styles)(Profile));
