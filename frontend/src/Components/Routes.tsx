import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../Pages/Home';
import AuthPage from '../Pages/Auth';
import KakaoAuthPage from '../Pages/Auth/Kakao';
import Header from './Header';
import SignOutPage from '../Pages/Auth/SignOut';
import PostViewPage from '../Pages/Article';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path={'/'} exact component={HomePage} />
      <Route path={'/auth/kakao/:token'} component={KakaoAuthPage} />
      <Route path={'/auth'} component={AuthPage} />
      <Route path={'/signout'} component={SignOutPage} />
      <Route path={'/post/:postId'} component={PostViewPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
