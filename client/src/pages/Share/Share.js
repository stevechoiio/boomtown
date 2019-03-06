import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';
const Share = ({ classes, tags }) => {
  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="row"
        alignItems="flex-start"
        justify="flex-start"
        spacing={40}
      >
        <Grid item xs={12} md={6} style={{ padding: 50 }}>
          <ShareItemPreview />
        </Grid>

        <Grid item xs={12} md={6}>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};

Share.propTypes = {
  classes: PropTypes.object,
  tags: PropTypes.array
};
export default Share;
