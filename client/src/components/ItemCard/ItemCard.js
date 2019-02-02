import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Gravatar from 'react-gravatar';
import { withStyles } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ViewerContext } from '../../context//ViewerProvider';
import TimeCalculator from './TimeCalculator';

const styles = {
  card: {
    minWidth: 250,
    maxWidth: 400,
    height: 600
  },
  media: {
    height: 230
  },
  button: { marginBottom: 100, marginLeft: 20 }
};

const ItemCard = ({ item, history, classes }) => {
  return (
    <Card
      onClick={() => {
        history && history.push(`/profile/${item.itemowner.id}`);
      }}
      className={classes.card}
    >
      <CardMedia
        className={classes.media}
        image="www.en.wikipedia.org/wiki/File:Welchcorgipembroke.JPG"
      />

      <CardContent>
        <ViewerContext.Consumer>
          {({ viewer, loading }) => {
            return (
              <>
                <Gravatar
                  style={{ borderRadius: '30px' }}
                  email={item.itemowner.id}
                  default="retro"
                />
                <Typography variant="h6" gutterBottom>
                  {item.itemowner.name ? item.itemowner.name : viewer.name}
                </Typography>
              </>
            );
          }}
        </ViewerContext.Consumer>
        <Typography component="h1" gutterBottom>
          {item.title}
        </Typography>
        <Typography>
          <TimeCalculator time={item.created} />
        </Typography>
        <Typography variant="h6" gutterBottom>
          {item.description}
        </Typography>
        <Typography>
          {item.tags
            .map(tag => {
              return tag.title;
            })
            .join(', ')}
        </Typography>
      </CardContent>
      <Button className={classes.button} variant="outlined">
        Borrow
      </Button>
    </Card>
  );
};

ItemCard.defaultProps = {
  item: {
    title: 'Name your Item',
    description: 'describe your item',
    id: 999,
    itemowner: { id: 999 },
    tags: []
  }
};
export default withStyles(styles)(ItemCard);
