import { ApolloServer, gql } from 'apollo-server';
import { typeDefs, resolvers } from './src/schema';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`GraphQL Server ready at ${url}`);
});
