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
  return <div className="channelsList">
    {channels.map(ch => <div className="channel" key={ch.id}>{ch.name}</div>)}
  </div>;
};

const App = () => (

  <div className="App">
    <div className="navbar">React + GraphQL Tutorial</div>

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