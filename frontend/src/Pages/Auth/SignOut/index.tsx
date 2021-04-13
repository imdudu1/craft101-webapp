import React from 'react';
import { Redirect } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../../../apollo';
import { LOCALSTORAGE_TOKEN_KEY } from '../../../constants';

const SignOutPage = () => {
  React.useEffect(() => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    isLoggedInVar(false);
    authTokenVar('');
  });
  return <Redirect to="/" />;
};

export default SignOutPage;
