import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { LOCALSTORAGE_TOKEN_KEY } from './constants';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

// TODO: Modifying URI Options for deployment and development environments

const wsLInk = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      'x-jwt': authTokenVar() || '',
    },
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLInk = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authTokenVar() || '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLInk,
  authLInk.concat(httpLink),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
