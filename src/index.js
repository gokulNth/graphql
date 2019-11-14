import { ApolloProvider } from 'react-apollo';
import React from 'react';
import { client } from './apolloClientBridge';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
