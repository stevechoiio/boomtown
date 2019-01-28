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
import MenuBar from '../../components/MenuBar';
import styles from './styles';
import { withRouter } from 'react-router-dom';
const Profile = ({ classes, id, user, history, styles }) => {
  return (
    <div>
      <MenuBar />

      <Card className={styles}>
        <CardContent>
          <Typography component="h2" variant="display4" gutterBottom>
            {user.name}
          </Typography>
          <Typography>
            Bio:{user.bio != 'null' ? user.bio : 'no bio shared'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {' '}
            <span style={{ color: 'Red' }}>
              {user.items.length}
            </span> owned,{' '}
            <span style={{ color: 'Red' }}>
              {user.items.borrowed ? user.items.borrowed.length : 0}
            </span>{' '}
            borrowed
          </Typography>

          <Typography component="h2" variant="h1" gutterBottom>
            Shared items:
          </Typography>

          <ItemsGrid items={user.items} history={history} />
        </CardContent>
      </Card>
    </div>
  );
};

export default withRouter(withStyles(styles)(Profile));
