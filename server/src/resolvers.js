import {
  ApolloError,
  ForbiddenError,
  AuthenticationError,
} from 'apollo-server';

const channels = [
  {
    id: '1',
    name: 'soccer',
    messages: [
      {
        id: '1',
        text: 'soccer is football',
      },
      {
        id: '2',
        text: 'hello soccer world cup',
      },
    ],
  },
  {
    id: '2',
    name: 'baseball',
    messages: [
      {
        id: '3',
        text: 'baseball is life',
      },
      {
        id: '4',
        text: 'hello baseball world series',
      },
    ],
  },
  {
    id: '3',
    name: 'private',
    private: true,
    messages: [
      {
        id: '5',
        text: 'baseball is life',
      },
      {
        id: '6',
        text: 'hello baseball world series',
      },
    ],
  },
];

let nextId = 4;
let nextMessageId = 7;

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const resolvers = {
  Query: {
    channels: (root, args, context) => {
      return sleep(500).then(() => {
        // filter out private channels if user is not logged in
        return context.user
          ? channels
          : channels.filter(channel => !channel.private);
      });
    },

    channel: (root, { id }, context) => {
      return sleep(500).then(() => {
        const channel = channels.find(channel => channel.id === id);

        if (channel.private && !context.user) {
          throw new ForbiddenError('You must log in to see this channel');
        } else {
          return channel;
        }
      });
    },
  },

  // Simulate some network latency in our mutations
  Mutation: {
    addChannel: (root, args) => {
      return sleep(500).then(() => {
        const newChannel = { id: nextId++, name: args.name };
        channels.push(newChannel);
        return newChannel;
      });
    },
    addMessage: (root, { message }) => {
      return sleep(500).then(() => {
        const channel = channels.find(
          channel => channel.id === message.channelId
        );
        if (!channel) throw new Error('Channel does not exist');
        const newMessage = { id: String(nextMessageId++), text: message.text };
        channel.messages.push(newMessage);
        return newMessage;
      });
    },
  },
};
