import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

const LoadingCircle = props => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

LoadingCircle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingCircle);
