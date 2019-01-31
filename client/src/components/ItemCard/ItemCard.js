import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Gravatar from 'react-gravatar';
import { withStyles } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const styles = {
  card: {
    minWidth: 250,
    maxWidth: 400,
    minHeight: 500
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
      <CardMedia className={classes.media} image={item.imageurl} />
      <CardContent>
        <Gravatar
          style={{ borderRadius: '30px' }}
          email={item.itemowner.id}
          default="retro"
        />
        <Typography variant="h6" gutterBottom>
          {item.itemowner.name}
        </Typography>
        <Typography component="h1" gutterBottom>
          {item.title}
        </Typography>
        <Typography>
          {Math.round(
            (new Date().getTime() - item.created) / 1000 / 60 / 60 / 24
          )}{' '}
          days ago
        </Typography>
        <Typography variant="h6" gutterBottom>
          {item.description}
        </Typography>
        {item.tags.map(tag => {
          return <Typography variant="caption">{tag.title}</Typography>;
        })}
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
