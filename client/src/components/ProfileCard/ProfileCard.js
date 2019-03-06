import React, { Fragment } from 'react';
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
      <Grid
        item
        alignContent="center"
        style={{ marginLeft: 100, marginTop: 50, marginRight: 100 }}
        justify="flex-start"
      >
        <Card className={classes.card}>
          <CardContent>
            <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
              <Gravatar
                email={user.id}
                style={{ borderRadius: '30px' }}
                default="retro"
              />
              <Typography
                style={{ paddingLeft: 20 }}
                component="h2"
                variant="display2"
                gutterBottom
              >
                {user.name}
              </Typography>
            </Grid>
            <Typography component="h2" variant="headline" gutterBottom>
              {user.items.length} owned,{' '}
              {user.items.borrowed ? user.items.borrowed.length : 0} borrowed
            </Typography>
            <Typography component="h2" variant="headline" gutterBottom>
              {user.bio != 'null' ? user.bio : 'no bio shared'}
            </Typography>
          </CardContent>
        </Card>
        <Typography
          component="h2"
          variant="display2"
          style={{ color: '#f9a825', marginTop: 20 }}
        >
          Shared items
        </Typography>
      </Grid>

      <ItemsGrid
        style={{ paddingTop: 0 }}
        items={user.items}
        history={history}
      />
    </Grid>
  );
};

export default withStyles(styles)(ProfileCard);
