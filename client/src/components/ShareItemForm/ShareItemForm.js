import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'react-final-form';
import TagList from '../TagList';
import Button from '@material-ui/core/Button';
import styles from './styles';

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
    return (
      <Form
        onSubmit={onSubmit}
        validate={formValidation}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Button variant="contained" href="#contained-buttons">
              Select an Image
            </Button>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="Name your Item"
            >
              {({ input, meta }) => (
                <div>
                  <TextField {...input} />
                  {console.log('meta is', meta)}
                  {meta.error && meta.touched && <span>{meta.itemTitle}</span>}
                </div>
              )}
            </Field>
            <Field
              name="description"
              component="input"
              type="text"
              placeholder="Name your Item"
            >
              {({ input, meta }) => (
                <div>
                  <TextField {...input} />
                  {console.log('meta is', meta)}
                  {meta.error && meta.touched && <span>{meta.itemTitle}</span>}
                </div>
              )}
            </Field>
            <Field name="tags" component="input" type="text">
              {({ input, meta }) => (
                <div>
                  <TextField select>
                    <TagList />

                    {console.log('meta is', meta)}
                    {meta.error &&
                      meta.touched && <span>{meta.itemTitle}</span>}
                  </TextField>
                </div>
              )}
            </Field>

            <Button variant="contained" href="#contained-buttons">
              Select an Image
            </Button>
            <Button type="submit">Submit</Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShareItemForm);
