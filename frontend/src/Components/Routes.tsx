import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Auth/Login';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={'/'} exact component={Home} />
      <Route path={'/login'} component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
