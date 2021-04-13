import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';
import { LOCALSTORAGE_TOKEN_KEY } from './constants';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const wsLInk = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'wss://api.gomi.land/graphql'
      : 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      'x-jwt': authTokenVar() || '',
    },
  },
});

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api.gomi.land/graphql'
      : 'http://localhost:4000/graphql',
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
          articles: offsetLimitPagination(),
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
