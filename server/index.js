// import resolver from '../src/resolver';
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const typeDefs = require('../src/schema');
const resolvers = require('../src/resolver');
const graphqlHTTP = require('express-graphql');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers //optional
});
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true //optional
  })
);
app.listen(4000);

// server is optional
