import React from 'react';
import { ALL_TAGS_QUERY } from '../../apollo/queries';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingCircle from '../../components/Loading/Loading';
import styles from './styles';

const TagList = ({ classes }) => {
  return (
    <div>
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingCircle />;
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select your tags:</FormLabel>
                <FormGroup>
                  {data.tags.map(tag => (
                    <FormControlLabel
                      control={<Checkbox key={tag.id} value={tag.title} />}
                      label={tag.title}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
              </FormControl>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(TagList);
