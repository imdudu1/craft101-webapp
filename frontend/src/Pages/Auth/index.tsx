import React, { useCallback } from 'react';
import useInputs from '../../Hooks/useInputs';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { authTokenVar, isLoggedInVar } from '../../apollo';
import { gql } from '@apollo/client/core';
import { Redirect } from 'react-router-dom';
import {
  LoginQueryGql,
  LoginQueryGqlVariables,
} from '../../__generated__/LoginQueryGql';
import { LOCALSTORAGE_TOKEN_KEY } from '../../constants';
import { Helmet } from 'react-helmet';

export const LOGIN_QUERY_GQL = gql`
  query LoginQueryGql($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const AuthPage: React.FC = () => {
  const [{ userId, userPw }, onChange] = useInputs({
    userId: '',
    userPw: '',
  });

  const [login] = useLazyQuery<LoginQueryGql, LoginQueryGqlVariables>(
    LOGIN_QUERY_GQL,
    {
      onCompleted: (data) => {
        const { login } = data;
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, login);
        isLoggedInVar(true);
        authTokenVar(login);
      },
    },
  );

  const onClick = useCallback(() => {
    login({
      variables: {
        username: userId,
        password: userPw,
      },
    });
  }, [login, userId, userPw]);

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <>
      <Helmet>
        <title>CRAFT101 :: 로그인</title>
      </Helmet>
      {isLoggedIn ? <Redirect to={'/'} /> : <></>}
    </>
  );
};

export default AuthPage;
