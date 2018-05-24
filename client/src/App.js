import React from 'react';
import './App.css';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_CHANNELS = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }`;


const ADD_CHANNEL = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;


const AddChannel = () => {

  let input;

  return (
    <Mutation mutation={ADD_CHANNEL}
              update={(cache, { data: { addChannel } }) => {
                // Perform cache updates so we see the UI changes immediately
                const { channels } = cache.readQuery({ query: GET_CHANNELS });
                cache.writeQuery({
                  query: GET_CHANNELS,
                  data: { channels: channels.concat([addChannel]) },
                });
              }}
    >

      {
        addChannel => (
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              // pass the variables to the mutation query that is passed in
              addChannel({ variables: { name: input.value } });
              // reset the input box
              input.value = '';
            }}>
              <input type="text" ref={node => {
                input = node;
              }}/>
            </form>
          </div>
        )
      }
    </Mutation>
  );
};


const ChannelsList = ({ channels }) => {
  return <div className="channelsList">
    <AddChannel/>
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