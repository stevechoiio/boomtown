import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import HomeContainer from '../pages/Home/HomeContainer';
import ShareContainer from '../pages/Share/ShareContainer';
import ProfileContainer from '../pages/Profile/ProfileContainer';
import ItemsContainer from '../pages/Items/ItemsContainer';
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
                <Route exact path="/items" component={ItemsContainer} />
                <Route exact path="/share" component={ShareContainer} />
                <Route exact path="/profile" component={ProfileContainer} />
                <Route path="/profile/:id" component={ProfileContainer} />
                <Redirect from="*" to="/items" />
              </Switch>
            </>
          );
        } else {
          return (
            <Switch>
              <Route exact path="/welcome" component={HomeContainer} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
      }}
    </ViewerContext.Consumer>
  </Fragment>
);
