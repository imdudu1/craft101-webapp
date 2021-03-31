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
import { Helmet } from 'react-helmet-async';
import LogoButton from '../../Components/LogoButton';

export const LOGIN_QUERY_GQL = gql`
  query LoginQueryGql($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const AuthPage: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [{ userId, userPw }, onChange] = useInputs({
    userId: '',
    userPw: '',
  });
  const [login] = useLazyQuery<LoginQueryGql, LoginQueryGqlVariables>(
    LOGIN_QUERY_GQL,
    {
      onCompleted: ({ login }) => {
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, login);
        isLoggedInVar(true);
        authTokenVar(login);
      },
      onError: (error) => {
        // TODO: implementing login failure handling
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

  return (
    <React.Fragment>
      <Helmet>
        <title>CRAFT101 :: 로그인</title>
      </Helmet>
      {isLoggedIn ? (
        <Redirect to={'/'} />
      ) : (
        <div className="max-w-md mx-auto bg-white shadow-sm rounded-md my-8">
          <div className="flex justify-center items-center">&nbsp;</div>
          <div className="bg-white pt-8 pb-8">
            <div className="w-4/5 mx-auto">
              <div className="flex items-center border-b bg-white rounded shadow-sm mb-4">
                <span className="px-3">
                  <svg
                    className="fill-current text-gray-500 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" />
                  </svg>
                </span>
                <input
                  className="w-full h-12 focus:outline-none"
                  type="text"
                  placeholder="Username"
                  onChange={onChange}
                  value={userId}
                  name="userId"
                />
              </div>
              <div className="flex items-center border-b bg-white rounded shadow-sm mb-4">
                <span className="px-3">
                  <svg
                    className="fill-current text-gray-500 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                </span>
                <input
                  className="w-full h-12 focus:outline-none"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  value={userPw}
                  name="userPw"
                />
              </div>
            </div>
            <div className="w-4/5 mx-auto">
              <div>
                <button
                  className="w-full py-2.5 bg-gray-800 rounded-md shadow-sm text-white font-medium outline-none"
                  type="button"
                  onClick={onClick}
                >
                  Sign in
                </button>
              </div>
              <div className="mt-8">
                <LogoButton
                  logo={
                    'https://icon-library.com/images/facebook-icon-32-x-32/facebook-icon-32-x-32-4.jpg'
                  }
                  text={'Sign in with Facebook'}
                  color={'#fff'}
                  bgColor={'#4A6EA9'}
                />
                <a
                  href="http://localhost:4000/auth/kakao"
                  className="hover:no-underline"
                >
                  <LogoButton
                    logo={
                      'https://cdn.iconscout.com/icon/free/png-256/kakaotalk-2-226573.png'
                    }
                    text={'Sign in with Kakaotalk'}
                    color={'#000'}
                    bgColor={'#FFE812'}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AuthPage;
