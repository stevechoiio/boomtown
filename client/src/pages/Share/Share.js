import React from 'react';
import Grid from '@material-ui/core/Grid';
/* 
 

  ShareItemForm is the form that our User will use to add a new item 
  and upload an image.

  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview/ShareItemPreview';
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
const Share = ({ classes }) => {
  return (
    <div>
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <ShareItemPreview />
        </Grid>

        <Grid item xs={6}>
          {/* <Mutation mutation={ADD_ITEM_MUTATION}>
            {/*
            children as a render function <<< */}
          {/* {(addItem, { loading, error }) => ( */}
          <ShareItemForm />
          )}
          {/* </Mutation> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Share;
