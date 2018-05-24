const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];

let nextId = 3;

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
  },

  Mutation: {
    addChannel: (root, args) => {
      return sleep(500).then(() => {
        const newChannel = { id: nextId++, name: args.name };
        channels.push(newChannel);
        return newChannel;
      });

    },
  },
};
