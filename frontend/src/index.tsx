import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import './Styles/tailwind.css';
import WebSocketProvider from './Context/WebSocketProvider';
import { client as ApolloClient } from './apollo';
import { LiveMC } from './live-mc';
import { WEBSOCKET_URL } from './constants';

const helmetContext = {};

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={ApolloClient}>
        <WebSocketProvider client={new LiveMC(WEBSOCKET_URL)}>
          <App />
        </WebSocketProvider>
      </ApolloProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
