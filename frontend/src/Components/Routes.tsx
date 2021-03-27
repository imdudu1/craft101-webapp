import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../Pages/Home';
import AuthPage from '../Pages/Auth';
import KakaoAuthPage from '../Pages/Auth/Kakao';
import Header from './Header';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path={'/'} exact component={HomePage} />
      <Route path={'/auth/kakao/:token'} component={KakaoAuthPage} />
      <Route path={'/auth'} component={AuthPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
