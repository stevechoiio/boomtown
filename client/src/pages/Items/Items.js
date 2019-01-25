import React from 'react';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuBar from '../../components/MenuBar';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 300,
    width: 400,
    margin: 20
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

const Items = ({ classes, history }) => {
  return (
    <>
      <Query query={ALL_ITEMS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <Grid container spacing={12} className={classes.root}>
                {data.items.map(item => (
                  <Grid item xs={4}>
                    <Card
                      className={classes.paper}
                      onClick={() => {
                        history.push(`/profile/${item.itemowner.id}`);
                      }}
                    >
                      <CardContent>
                        <h1>{item.title}</h1>
                        <h1>owned by {item.itemowner.name}</h1>
                        <ul>
                          {item.tags.map(tag => {
                            return <li>{tag.title}</li>;
                          })}
                        </ul>
                        <h3>about the item:{item.description}</h3>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          );
        }}
      </Query>
    </>
  );
};

export default withRouter(withStyles(styles)(Items));
