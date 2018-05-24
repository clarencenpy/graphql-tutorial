import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import NotFound from './NotFound';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';

export const GET_CHANNEL = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;


const ChannelDetails = ({ match }) => (
  <Query query={GET_CHANNEL}
         variables={{ channelId: match.params.channelId }}
  >
    {
      ({ loading, error, data: { channel } }) => {
        if (loading) return <ChannelPreview channelId={match.params.channelId} />;
        if (error) return <p>{error.message}</p>;
        if (channel === null) return <NotFound/>;
        return (
          <div>
            <div className="channelName">{channel.name}</div>
            <MessageList messages={channel.messages}/>
          </div>
        );
      }
    }
  </Query>
);

export default ChannelDetails;