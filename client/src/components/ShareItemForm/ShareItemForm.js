import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Form, Field, FormSpy } from 'react-final-form';
import Button from '@material-ui/core/Button';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography, FormControl, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/modules/ShareItem';
import validate from './helpers/validation';

class ShareItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTagsForRedux(tags)
    });
  }

  handleSelectTags = event => {
    this.setState({ selectedTags: event.target.value });
  };

  applyTagsForRedux(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t) > -1)
        .map(t => ({ id: t }))
    );
  }
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  handleSelectFile = event => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  render() {
    const { classes, updateItem, resetImage, resetItem, tags } = this.props;

    return (
      <Grid container className={classes.root} direction="row">
        <Typography variant="display4" className={classes.headline}>
          Share. Borrow. Prosper.
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          validate={value => {
            return validate(
              value,
              this.state.selectedTags,
              this.state.fileSelected
            );
          }}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            invalid
          }) => (
            <Mutation mutation={ADD_ITEM_MUTATION}>
              {addItem => (
                <div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();

                      addItem({
                        variables: {
                          item: {
                            title: values.title,
                            description: values.description,
                            tags: this.applyTags(this.state.selectedTags)
                          }
                        }
                      });

                      resetItem();
                      this.fileInput.current.value = '';
                      this.setState({ selectedTags: [] });
                      resetImage();
                      form.reset();
                    }}
                  >
                    <FormSpy
                      subscription={{ values: true }}
                      component={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updateItem);
                        }
                        return '';
                      }}
                    />
                    {this.state.fileSelected ? (
                      <Button
                        className={classes.button}
                        variant="contained"
                        component="span"
                        onClick={() => {
                          this.fileInput.current.value = '';
                          this.setState({ fileSelected: false });
                          resetImage();
                        }}
                      >
                        reset image
                      </Button>
                    ) : (
                      <Button
                        className={classes.button}
                        variant="contained"
                        component="span"
                        onClick={() => {
                          this.fileInput.current.click();
                        }}
                      >
                        Select an Image
                      </Button>
                    )}
                    <input
                      hidden
                      type="file"
                      id="fileInput"
                      ref={this.fileInput}
                      accept="image/*"
                      onChange={() => {
                        this.handleSelectFile();
                      }}
                    />
                    <Field name="title" component="input" type="text">
                      {({ input, meta }) => (
                        <div>
                          <TextField
                            className={classes.formField}
                            {...input}
                            placeholder="Name your Item"
                          />

                          {meta.error &&
                            meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                    <Field name="description" component="input" type="text">
                      {({ input, meta }) => (
                        <div>
                          <TextField className={classes.formField} {...input} />

                          {meta.error &&
                            meta.touched && <span>{meta.error}</span>}
                        </div>
                      )}
                    </Field>

                    <Field name="tags">
                      {({ input, meta }) => {
                        return (
                          <FormControl>
                            <InputLabel htmlFor="select-multiple-checkbox">
                              select tags
                            </InputLabel>
                            <Select
                              multiple
                              className={classes.formField}
                              value={this.state.selectedTags}
                              onChange={this.handleSelectTags}
                              renderValue={selected => {
                                return this.generateTagsText(tags, selected);
                              }}
                            >
                              {tags &&
                                tags.map(tag => {
                                  return (
                                    <MenuItem key={tag.id} value={tag.id}>
                                      <Checkbox
                                        checked={
                                          this.state.selectedTags.indexOf(
                                            tag.id
                                          ) > -1
                                        }
                                      />
                                      <ListItemText> {tag.title}</ListItemText>
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        );
                      }}
                    </Field>
                    <div />
                    <Button
                      disabled={submitting || pristine}
                      style={{ marginTop: 20, backgroundColor: '#f9a825' }}
                      type="submit"
                    >
                      Share
                    </Button>
                  </form>
                </div>
              )}
            </Mutation>
          )}
        />
      </Grid>
    );
  }
}

// ShareItemForm.propTypes = {
//   classes: PropTypes.object.isRequired
// };

const mapDispatchToProps = dispatch => ({
  /*  This function will provide a prop called 
    'updateNewItem' to our component. */
  updateItem(item) {
    // Inside this function we can dispatch data to our reducer.
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetImage() {
    dispatch(resetImage());
  }

  // ... other methods
});

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
