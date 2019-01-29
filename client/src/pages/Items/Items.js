import React from 'react';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
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

export default withRouter(withStyles(styles)(Items));
