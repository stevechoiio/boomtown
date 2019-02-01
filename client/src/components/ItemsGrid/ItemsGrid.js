import React from 'react';

import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import ItemCard from '../ItemCard/ItemCard';

const ItemsGrid = ({ items, classes, history }) => {
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.root}
        direction="row"
        alignItems="center"
        justify="left"
        spacing={24}
      >
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ItemCard item={item} history={history} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ItemsGrid);
