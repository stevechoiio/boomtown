import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Form, Field } from 'react-final-form';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
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

    return (
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit, reset, submitting, pristine, values }) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                const { password, email, fullname } = values;

                if (this.state.formToggle) {
                  this.props.loginMutation({
                    variables: {
                      user: { email, password }
                    }
                  });
                } else {
                  this.props.signupMutation({
                    variables: {
                      user: {
                        email,
                        password,

                        name: fullname
                      }
                    }
                  });
                }
              }}
              className={classes.accountForm}
            >
              {!this.state.formToggle && (
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="fullname">Username</InputLabel>
                  <Field name="fullname" component="input">
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        inputProps={{
                          'aria-label': 'Description'
                        }}
                      />
                    )}
                  </Field>
                </FormControl>
              )}
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field name="email" component="input">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      inputProps={{
                        'aria-label': 'Description'
                      }}
                    />
                  )}
                </Field>
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Field name="password" component="input">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      type="password"
                      inputProps={{
                        'aria-label': 'Description'
                      }}
                    />
                  )}
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
                    color="secondary"
                    disabled={pristine}
                  >
                    {this.state.formToggle ? 'Enter' : 'Create Account'}
                  </Button>
                  <Typography>
                    <button
                      className={classes.formToggle}
                      type="button"
                      onClick={() => {
                        reset();
                        this.setState({
                          formToggle: !this.state.formToggle
                        });
                      }}
                    >
                      {this.state.formToggle
                        ? 'Create an account.'
                        : 'Login to existing account.'}
                    </button>
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

      // @TODO: Close Final Form <Form />
    );
  }
}

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
// @TODO: Use compose to add the login and signup mutations to this components props.
// @TODO: Refetch the VIEWER_QUERY to reload the app and access authenticated routes.
export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
