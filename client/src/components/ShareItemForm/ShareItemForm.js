import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'react-final-form';
import TagList from '../TagList/TagList';
import Button from '@material-ui/core/Button';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const onSubmit = values => {
  console.log(values);
};

const formValidation = values => {
  const errors = {};
  if (!values.title) {
    errors.itemTitle = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';

    return errors;
  }
};

class ShareItemForm extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Typography variant="display4" className={classes.headline}>
          Share. Borrow. Prosper.
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={formValidation}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Button
                className={classes.button}
                variant="contained"
                href="#contained-buttons"
              >
                Select an Image
              </Button>
              <Field name="title" component="input" type="text">
                {({ input, meta }) => (
                  <div>
                    <TextField
                      className={classes.formField}
                      {...input}
                      placeholder="Name your Item"
                    />
                    {console.log('meta is', meta)}
                    {meta.error &&
                      meta.touched && <span>{meta.itemTitle}</span>}
                  </div>
                )}
              </Field>
              <Field name="description" component="input" type="text">
                {({ input, meta }) => (
                  <div>
                    <TextField
                      className={classes.formField}
                      {...input}
                      placeholder="Describe your Item"
                    />
                    {console.log('meta is', meta)}
                    {meta.error &&
                      meta.touched && <span>{meta.itemTitle}</span>}
                  </div>
                )}
              </Field>
              <Field name="tags" component="input" type="text">
                {({ input, meta }) => (
                  <div>
                    <TextField select className={classes.formField}>
                      <TagList />

                      {console.log('meta is', meta)}
                      {meta.error &&
                        meta.touched && <span>{meta.itemTitle}</span>}
                    </TextField>
                  </div>
                )}
              </Field>

              <Button type="submit">Submit</Button>
            </form>
          )}
        />
      </Grid>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareItemForm);
