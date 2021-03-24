import React, { useCallback } from 'react';
import styled from 'styled-components';
import useInputs from '../../Hooks/useInputs';
import { Button, TextField } from '@material-ui/core';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { authTokenVar, isLoggedInVar } from '../../apollo';
import { gql } from '@apollo/client/core';
import { Redirect } from 'react-router-dom';
import {
  LoginQueryGql,
  LoginQueryGqlVariables,
} from '../../__generated__/LoginQueryGql';
import { LOCALSTORAGE_TOKEN_KEY } from '../../constants';

const LoginContainerStyled = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginFormWrapperStyled = styled.div`
  width: 420px;
`;
const LoginFormInputWrapperStyled = styled.div`
  margin: 13px 0;
`;
const LoginFormButtonWrapperStyled = styled.div``;
const TextFieldStyled = styled(TextField)`
  width: 100%;
  background-color: #fff;
`;
const ButtonStyled = styled(Button)`
  border-radius: 0;
  width: 100%;
  height: 42px;
`;

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
    <LoginContainerStyled>
      {isLoggedIn ? (
        <Redirect to={'/'} />
      ) : (
        <LoginFormWrapperStyled>
          <LoginFormInputWrapperStyled>
            <TextFieldStyled
              label={'ID'}
              name="userId"
              onChange={onChange}
              value={userId}
              variant={'outlined'}
            />
          </LoginFormInputWrapperStyled>
          <LoginFormInputWrapperStyled>
            <TextFieldStyled
              label={'Password'}
              name="userPw"
              onChange={onChange}
              value={userPw}
              type="password"
              variant={'outlined'}
            />
          </LoginFormInputWrapperStyled>
          <LoginFormButtonWrapperStyled>
            <ButtonStyled
              variant={'contained'}
              color={'primary'}
              onClick={onClick}
              disableElevation
            >
              로그인
            </ButtonStyled>
          </LoginFormButtonWrapperStyled>
        </LoginFormWrapperStyled>
      )}
    </LoginContainerStyled>
  );
};

export default AuthPage;
