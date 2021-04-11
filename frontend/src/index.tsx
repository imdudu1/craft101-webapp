import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { WebSocketProvider } from './Context/WebSocketProvider';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { client as ApolloClient } from './apollo';
import { client as LiveMCClient } from './live-mc';
import './Styles/tailwind.css';

const helmetContext = {};

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={ApolloClient}>
        <WebSocketProvider client={LiveMCClient}>
          <App />
        </WebSocketProvider>
      </ApolloProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
