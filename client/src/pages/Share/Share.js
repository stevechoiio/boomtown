import React from 'react';
import Grid from '@material-ui/core/Grid';
/* 
  TODO: Create ShareItemFrom and ShareItemPreview in the components dir
  and call them from this file.

  ShareItemForm is the form that our User will use to add a new item 
  and upload an image.

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';

const Share = ({ classes }) => {
  return (
    <div>
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <ShareItemPreview />
        </Grid>
        <Grid item xs={6}>
          <ShareItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Share;
