import React from 'react';

import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { withStyles } from '@material-ui/core';
import ItemCard from '../ItemCard/ItemCard';

const ItemsGrid = ({ items, classes, history }) => {
  return (
    <div>
      <Grid
        className={classes.media}
        container
        alignItems="flex-start"
        spacing={16}
      >
        {items.map(item => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <ItemCard item={item} history={history} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ItemsGrid);
