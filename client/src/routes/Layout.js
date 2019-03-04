import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import Items from '../pages/Items';
import { ViewerContext } from '../context/ViewerProvider';
import MenuBar from '../components/MenuBar/MenuBar';
export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return 'loading';
        if (viewer) {
          return (
            <>
              <MenuBar />
              <Switch>
                <Route exact path="/items" component={Items} />
                <Route exact path="/share" component={Share} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/profile/:id" component={Profile} />
                <Redirect from="*" to="/items" />
              </Switch>
            </>
          );
        } else {
          return (
            <Switch>
              <Route exact path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
      }}
    </ViewerContext.Consumer>
  </Fragment>
);
