import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'react-final-form';
import TagList from '../TagList';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const onSubmit = async values => {
  window.alert(values);
};
class ShareItemForm extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        validate={() => {}}
        render={({ handleSubmit, pristine, invalid }) => (
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />

            <TextField
              id="standard-full-width"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Describe your item"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="tag"
              select
              label="Tags"
              className={classes.textField}
              onChange={this.handleChange('currency')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="tags"
              margin="normal"
              variant="outlined"
            >
              <TagList />
            </TextField>

            <Button
              variant="contained" 
              href="#contained-buttons"
              className={classes.button}
            >
              Select an Image
            </Button>
            <Button
              type="submit"
              variant="contained"
              href="#contained-buttons"
              className={classes.button}
            >
              Submit
            </Button>
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
