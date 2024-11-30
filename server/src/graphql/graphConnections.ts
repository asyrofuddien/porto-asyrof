import express from 'express'; // Import Express and Application type
import { ApolloServer } from 'apollo-server-express'; // Import ApolloServer from apollo-server-express
import { makeExecutableSchema } from 'graphql-tools'; // Import makeExecutableSchema from graphql-tools
import { applyMiddleware } from 'graphql-middleware'; // Import applyMiddleware from graphql-middleware
import { resolvers, typeDefs } from '.'; // Import typeDefs and resolvers

// Create an executable schema using type definitions and resolvers
const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

// Apply middleware to the executable schema to add functionality
const protectedSchema = applyMiddleware(executableSchema);

// Define the connection function to set up Apollo Server with Express
const connGraphQl = async (app: express.Application): Promise<void> => {
  const server = new ApolloServer({
    schema: protectedSchema, // Set the schema to the protected schema
    context: ({ req }) => ({
      req, // Set the context to include the request object
    }),
  });

  const port = process.env.PORT; // Define the port for the server

  // Start the Apollo Server before applying middleware
  await server.start();

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  // Start the server
  app.listen({ port }, () => console.log(`Connected at http://localhost:${port}${server.graphqlPath}`));
};

export { connGraphQl };
