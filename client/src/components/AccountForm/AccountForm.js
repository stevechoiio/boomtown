import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';

import styles from './styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Form
        render={({ handleSubmit, pristine, invalid }) => {
          return (
            <form
              onSubmit={() => {
                console.log('Submitted');
              }}
              className={classes.accountForm}
            >
              {!this.state.formToggle && (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="fullname">Username</InputLabel>
                  <Form>
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      value={''}
                    />
                  </Form>
                </FormControl>
              )}
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field>
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={''}
                  />
                </Field>
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Field>
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={''}
                  />
                </Field>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    className={classes.formButton}
                    variant="contained"
                    size="large"
                    onClick={e => {
                      e.preventDefault();
                      if (this.state.formToggle) {
                        this.props.loginMutation({
                          variables: { user: { email: 'a', password: '1324' } }
                        });
                      } // TODO ::get login form inputs
                      else {
                        this.props.signupMutation({ variables: '' });
                      }
                    }} //TODO: get singup login form inputs
                    color="secondary"
                    disabled={
                      false // @TODO: This prop should depend on pristine or valid state of form
                    }
                  >
                    {this.state.formToggle ? 'Enter' : 'Create Account'}
                  </Button>
                  <Typography>
                    <button
                      className={classes.formToggle}
                      type="button"
                      onClick={() => {
                        this.setState({
                          formToggle: !this.state.formToggle
                        });
                      }}
                    >
                      {this.state.formToggle
                        ? 'Create an account.'
                        : 'Login to existing account.'}
                    </button>
                    <Link to="/items">enter</Link>
                  </Typography>
                </Grid>
              </FormControl>
              <Typography className={classes.errorMessage}>
                {/* @TODO: Display sign-up and login errors */}
              </Typography>
            </form>
          );
        }}
      />
    );
  }
}

// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
export default compose(
  graphql(SIGNUP_MUTATION, {
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
