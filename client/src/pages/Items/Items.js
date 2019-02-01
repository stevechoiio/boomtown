import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';

const Items = ({ classes, history, items }) => {
  return (
    <>
      <ItemsGrid items={items} history={history} />
    </>
  );
};

export default withRouter(Items);
