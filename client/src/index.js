import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Use apollo-boost to initialize with sane defaults
const client = new ApolloClient({ uri: 'http://localhost:4000/graphql/' });

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);


ReactDOM.render(<ApolloApp/>, document.getElementById('root'));
registerServiceWorker();
