import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import MenuBar from '../../components/MenuBar/MenuBar';

const Items = ({ classes, history, items }) => {
  return (
    <>
      <MenuBar />
      <ItemsGrid items={items} history={history} />
    </>
  );
};

export default withRouter(Items);
