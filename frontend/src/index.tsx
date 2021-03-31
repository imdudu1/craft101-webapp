import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';
import {HelmetProvider} from "react-helmet-async"
import './Styles/tailwind.css';

const helmetContext = {}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
