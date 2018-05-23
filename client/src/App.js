import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_CHANNELS = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }`;


const ChannelsList = ({ channels }) => {
  return <ul>
    {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
  </ul>;
};

const App = () => (

  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Welcome to Apollo</h1>
    </header>

    {/* Use the new Query HOC */}
    <Query query={GET_CHANNELS}>
      {
        ({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            return <p>{error.message}</p>;
          }
          return <ChannelsList channels={data.channels}/>;
        }
      }
    </Query>

  </div>
);

export default App;