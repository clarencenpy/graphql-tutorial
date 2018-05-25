import { ApolloServer, gql } from 'apollo-server';
import { typeDefs, resolvers } from './src/schema';
import { getUser } from './src/auth';
import { AuthenticationError } from 'apollo-server';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);

    // this gives a 500 error on the client which is misleading
    // if (!user) throw new AuthenticationError('You must be logged in');

    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`GraphQL Server ready at ${url}`);
});
