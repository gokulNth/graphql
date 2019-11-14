import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; //depth
import { createBridgeLink } from 'apollo-bridge-link';
import resolver from './resolver';
import schema from './schema';

const mock = false;

const context = {
  graphQl: 'is cool'
};

export const client = new ApolloClient({
  link: createBridgeLink({ schema, resolvers: resolver, mock, context }),
  cache: new InMemoryCache({ addTypename: true })
});
