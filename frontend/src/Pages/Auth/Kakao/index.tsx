import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../../../apollo';
import { LOCALSTORAGE_TOKEN_KEY } from '../../../constants';

interface KakaoAuthProps {
  token: string;
}

const KakaoAuthPage = ({
  match: {
    params: { token },
  },
}: RouteComponentProps<KakaoAuthProps>) => {
  const isLoggedIn = isLoggedInVar();
  if (!isLoggedIn) {
    isLoggedInVar(true);
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
    authTokenVar(token);
  }
  return <Redirect to={'/'} />;
};

export default KakaoAuthPage;
