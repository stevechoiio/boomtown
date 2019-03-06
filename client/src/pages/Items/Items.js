import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
const Items = ({ classes, history, items }) => {
  return (
    <Grid style={{ marginTop: 40 }}>
      <ItemsGrid items={items} history={history} />
    </Grid>
  );
};

Items.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  items: PropTypes.array
};
export default withRouter(Items);
