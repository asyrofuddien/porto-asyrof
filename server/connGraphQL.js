const { ApolloServer } = require('apollo-server-express'); //Import ApolloServer from apollo-server-express
/*
component provided by Apollo Server that helps in setting up a GraphQL server with Express.
*/
const { makeExecutableSchema } = require('graphql-tools'); // Import makeExecutableSchema from graphql-tools
/*
This function is used to create an executable GraphQL schema from the provided type definitions and resolvers.
*/
const { applyMiddleware } = require('graphql-middleware'); // Import applyMiddleware from graphql-middleware
/*
This function allows you to apply middleware to the GraphQL schema, 
enabling additional functionality like authentication, authorization, and error handling.
*/
const { typeDefs, resolvers } = require('./graphql'); // Import typeDefs and resolvers from ./graphql
/*
These are essential components for defining the schema (type definitions) and the corresponding resolvers for your GraphQL API.
*/
const executableSchema = makeExecutableSchema({ typeDefs, resolvers }); // Create an executable schema using type definitions and resolvers
const protectedSchema = applyMiddleware(executableSchema); // Apply middleware to the executable schema to add functionality like authentication and authorization
const { songLoader, PlaylistLoader } = require('./loader');
// Create an Apollo Server instance with the protected schema and context setup

const conn = (app) => {
  const server = new ApolloServer({
    schema: protectedSchema, // Set the schema to the protected schema (with applied middleware)
    context: function ({ req }) {
      return {
        songLoader,
        PlaylistLoader,
        req: req,
      };
    },
  });

  const port = 4000; // Define the port on which the server will run
  server.applyMiddleware({ app }); // Apply the Apollo Server middleware to the Express application
  app.listen({ port: port }, () => console.log(`Connected at http://localhost:${port}${server.graphqlPath}`)); // Start the server to listen on the specified port
};
module.exports = { conn };
