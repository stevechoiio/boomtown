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
import CardHeader from '@material-ui/core/CardHeader';
import styles from './styles';

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
        image={item.imageurl}
        title={item.title}
      />

      <ViewerContext.Consumer>
        {({ viewer, loading }) => {
          return (
            <CardHeader
              style={{ left: 32 }}
              title={
                <Typography>
                  {item.itemowner.name ? item.itemowner.name : viewer.name}
                </Typography>
              }
              subheader={
                <Typography>
                  <TimeCalculator time={item.created} />
                </Typography>
              }
              avatar={
                <Gravatar
                  style={{ borderRadius: '30px' }}
                  email={item.itemowner.id}
                  default="retro"
                />
              }
            />
          );
        }}
      </ViewerContext.Consumer>
      <CardContent>
        <Typography variant="title" gutterBottom>
          {item.title}
        </Typography>
        <Typography variant="caption" gutterBottom>
          {item.tags
            .map(tag => {
              return tag.title;
            })
            .join(', ')}
        </Typography>{' '}
        <Typography variant="body1" gutterBottom align="left">
          {item.description}
        </Typography>
        <Button className={classes.button} variant="outlined">
          Borrow
        </Button>
      </CardContent>
    </Card>
  );
};
ItemCard.propTypes = {
  item: PropTypes.object
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
