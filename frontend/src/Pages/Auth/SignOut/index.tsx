import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { LOCALSTORAGE_TOKEN_KEY } from '../../../constants';
import { authTokenVar, isLoggedInVar } from '../../../apollo';

const SignOut = () => {
  useEffect(() => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    isLoggedInVar(false);
    authTokenVar('');
  });
  return <Redirect to="/" />;
};

export default SignOut;
