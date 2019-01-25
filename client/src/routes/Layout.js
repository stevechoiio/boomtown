import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import HomeContainer from '../pages/Home/HomeContainer';
import ShareContainer from '../pages/Share/ShareContainer';
import ProfileContainer from '../pages/Profile/ProfileContainer';
import ItemsContainer from '../pages/Items/ItemsContainer';
import Share from '../pages/Share/ShareContainer';

export default () => (
  <Switch>
    <Route exact path="/items" component={ItemsContainer} />
    <Route exact path="/welcome" component={HomeContainer} />
    <Route exact path="/share" component={ShareContainer} />
    <Route exact path="/profile" component={ProfileContainer} />
    <Route exact path="/share" component={Share} />
    <Route path="/profile/:id" component={ProfileContainer} />
    <Redirect path="/items" />
    <Redirect from="/" to="/welcome" />
  </Switch>
);
