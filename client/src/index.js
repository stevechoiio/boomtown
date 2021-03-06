import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/index';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import client from './apollo';
import Layout from './routes/Layout';

/**
 * @TODO: Add the Viewer Context
 *
 //  */
import { ViewerProvider } from './context/ViewerProvider';
/*
 * Below in your <App />, wrap the <ViewerProvider /> component around
 * the <BrowserRouter /> component so the router is aware of whether a
 * user is currently logged in and who that user is.
 */

// @TODO: Remove this import once you have your router working below

// -------------------------------

import './index.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ViewerProvider>
        <ReduxProvider store={store}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          </MuiThemeProvider>
        </ReduxProvider>
      </ViewerProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
