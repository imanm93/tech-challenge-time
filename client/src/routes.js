/**
 * Setup Routes
 */
import React from 'react';
import { Switch, Route } from 'react-router';

import Landing from './containers/Landing';
import Portal from './containers/Portal';

const Routes = () => (
  <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/portal" component={Portal} />
  </Switch>
)

export default Routes;
