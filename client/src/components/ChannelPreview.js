import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import NotFound from './NotFound';

// notice the messages field has been omitted from the preview
const GET_CHANNEL_PREVIEW = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

const ChannelPreview = ({ channelId }) => (
  <Query query={GET_CHANNEL_PREVIEW} variables={{ channelId }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.message}</p>;
      if (data.channel === null) return <NotFound />;
      return (
        <div>
          <div className="channelName">{data.channel.name}</div>
          <div>Loading Messages...</div>
        </div>
      );
    }}
  </Query>
);

export default ChannelPreview;
