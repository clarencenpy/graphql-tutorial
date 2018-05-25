import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import NotFound from './NotFound';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';

export const GET_CHANNEL = gql`
  query ChannelDetailsQuery($channelId: ID!) {
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
  <Query
    query={GET_CHANNEL}
    errorPolicy="all"
    variables={{ channelId: match.params.channelId }}
  >
    {({ data, error, loading }) => {
      if (loading) return <ChannelPreview channelId={match.params.channelId} />;
      if (error) {
        return error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ));
      }
      if (data.channel === null) return <NotFound />;
      return (
        <div>
          <div className="channelName">{data.channel.name}</div>
          <MessageList messages={data.channel.messages} />
        </div>
      );
    }}
  </Query>
);

export default ChannelDetails;
