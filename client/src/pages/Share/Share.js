import React from 'react';
import Grid from '@material-ui/core/Grid';

import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';
const Share = ({ classes, tags }) => {
  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={6}>
          <ShareItemPreview />
        </Grid>

        <Grid item xs={6}>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Share;
