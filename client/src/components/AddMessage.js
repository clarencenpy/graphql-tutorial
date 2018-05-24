import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { GET_CHANNEL } from './ChannelDetails';
import { withRouter } from 'react-router';
import { gql } from 'apollo-boost/lib/index';

const ADD_MESSAGE = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

class AddMessage extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }


  handleSubmit(addMessage, e) {
    e.preventDefault();
    // pass the variables to the mutation query that is passed in
    addMessage({
      variables: {
        message: {
          channelId: this.props.match.params.channelId,
          text: this.state.text,
        },
      },
    });
    // reset the input box
    this.setState({ text: '' });
  }

  render() {
    const channelId = this.props.match.params.channelId;
    return (
      <Mutation mutation={ADD_MESSAGE}
                update={(cache, { data: { addMessage } }) => {
                  // Perform cache updates so we see the UI changes immediately
                  const data = cache.readQuery({
                    query: GET_CHANNEL,
                    variables: { channelId },
                  });
                  // Add our Message from the mutation to the end.
                  data.channel.messages.push(addMessage);
                  // Write the data back to cache
                  cache.writeQuery({
                    query: GET_CHANNEL,
                    variables: { channelId },
                    data,
                  });
                }}
                optimisticResponse={{
                  __typename: 'Mutation',
                  addMessage: {
                    __typename: 'Message',
                    text: this.state.text,
                    // exploit the fact that optimistic ids are negative,
                    // to style them differently
                    id: Math.round(Math.random() * -1000000),
                  },
                }}
      >

        {
          (addMessage, { loading, error }) => {
            return <div className='messageInput'>
              <form onSubmit={this.handleSubmit.bind(this, addMessage)}>
                <input value={this.state.text}
                       placeholder='Add Message'
                       onChange={this.handleChange.bind(this)}/>
              </form>
              {loading && <p>Loading...</p>}
            </div>;
          }
        }

      </Mutation>
    );
  };
};

export default withRouter(AddMessage);