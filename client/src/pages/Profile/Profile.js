import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { withStyles } from '@material-ui/core/styles';

import MenuBar from '../../components/MenuBar';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};
const Profile = ({ classes, id }) => {
  return (
    <div>
      <MenuBar />

      <Query variables={{ id: id }} query={ALL_USER_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          const USER = data.user;
          return (
            <>
              <Card className={classes.styles}>
                <CardContent>
                  <Typography component="h2" variant="display4" gutterBottom>
                    {USER.name}
                  </Typography>
                  <Typography>
                    Bio:{USER.bio != 'null' ? USER.bio : 'no bio shared'}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {' '}
                    <span style={{ color: 'Red' }}>
                      {USER.items.length}
                    </span>{' '}
                    owned,{' '}
                    <span style={{ color: 'Red' }}>
                      {USER.items.borrowed ? USER.items.borrowed.length : 0}
                    </span>{' '}
                    borrowed
                  </Typography>

                  <Typography component="h2" variant="h1" gutterBottom>
                    Shared items:
                  </Typography>

                  {USER.items.map(item => {
                    return (
                      <>
                        <Typography variant="h2" gutterBottom>
                          {item.title}
                        </Typography>

                        <li>{item.description}</li>
                      </>
                    );
                  })}

                  <Typography
                    color="textSecondary"
                    variant="h5"
                    component="h2"
                    gutterBottom
                  />
                </CardContent>
              </Card>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(Profile);
