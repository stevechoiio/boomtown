import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import PropTypes from 'prop-types';
const Items = ({ classes, history, items }) => {
  return (
    <>
      <ItemsGrid items={items} history={history} />
    </>
  );
};

Items.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  items: PropTypes.array
};
export default withRouter(Items);
