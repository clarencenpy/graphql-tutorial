import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

export const GET_CHANNELS = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export const ADD_CHANNEL = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

// Controlled component for the input element
class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(addChannel, e) {
    e.preventDefault();
    // pass the variables to the mutation query that is passed in
    addChannel({ variables: { name: this.state.name } });
    // reset the input box
    this.setState({ name: '' });
  }

  render() {
    return (
      <Mutation
        mutation={ADD_CHANNEL}
        update={(cache, { data: { addChannel } }) => {
          // Perform cache updates so we see the UI changes immediately
          const { channels } = cache.readQuery({ query: GET_CHANNELS });
          cache.writeQuery({
            query: GET_CHANNELS,
            data: { channels: channels.concat([addChannel]) },
          });
        }}
        optimisticResponse={{
          __typename: 'Mutation',
          addChannel: {
            __typename: 'Channel',
            name: this.state.name,
            // exploit the fact that optimistic ids are negative,
            // to style them differently
            id: Math.round(Math.random() * -1000000),
          },
        }}
      >
        {(addChannel, { loading, error }) => {
          return (
            <div>
              <form onSubmit={this.handleSubmit.bind(this, addChannel)}>
                <input
                  value={this.state.name}
                  placeholder="Add New Channel"
                  onChange={this.handleChange.bind(this)}
                />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

const ChannelsList = () => (
  <Query query={GET_CHANNELS} pollInterval={500}>
    {({ loading, error, data: { channels } }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.message}</p>;
      return (
        <div className="channelsList">
          <AddChannel />
          {channels.map(ch => (
            <div
              key={ch.id}
              className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}
            >
              <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>{ch.name}</Link>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default ChannelsList;
