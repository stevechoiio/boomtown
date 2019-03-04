import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import { withStyles } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import styles from './styles';
const ProfileCard = ({ user, history, classes }) => {
  return (
    <Grid alignContent="center">
      <Grid fullwidth item alignContent="center">
        <Card className={classes.card}>
          <Gravatar
            email={user.id}
            style={{ borderRadius: '30px' }}
            default="retro"
          />
          <CardContent>
            <Typography component="h4" variant="display4">
              {user.name}
            </Typography>
            <Typography>
              Bio:{user.bio != 'null' ? user.bio : 'no bio shared'}
            </Typography>
            <Typography variant="subtitle1">
              {' '}
              <span style={{ color: 'Red' }}>
                {user.items.length}
              </span> owned,{' '}
              <span style={{ color: 'Red' }}>
                {user.items.borrowed ? user.items.borrowed.length : 0}
              </span>{' '}
              borrowed
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid>
        <Typography component="h2" variant="h1">
          Shared items:
        </Typography>
        <ItemsGrid items={user.items} history={history} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ProfileCard);
