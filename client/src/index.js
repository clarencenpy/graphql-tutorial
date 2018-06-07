import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';

// Use apollo-boost to initialize with useful defaults
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  request: async (operation) => {
    const token = 'verysecretakey';
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  cacheRedirects: {
    Query: {
      channel: (_, { id }, { getCacheKey }) => {
        return getCacheKey({
          __typename: 'Channel',
          id,
        });
      },
    },
  },
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
