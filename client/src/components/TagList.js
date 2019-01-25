import React from 'react';
import { ALL_TAGS_QUERY } from '../apollo/queries';
import MenuItem from '@material-ui/core/MenuItem';
import { Query } from 'react-apollo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const TagList = () => {
  return (
    <div>
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          console.log('data is:', data);
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <>
              {data.tags.map(tag => (
                <MenuItem key={tag.id} value={tag.title}>
                  <FormControlLabel
                    control={<Checkbox value="checkedB" color="primary" />}
                    label={tag.title}
                  />
                </MenuItem>
              ))}
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default TagList;
