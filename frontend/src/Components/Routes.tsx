import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "../Pages/Home";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={"/"} exact component={Home}/>
    </Switch>
  </BrowserRouter>
)

export default Routes
