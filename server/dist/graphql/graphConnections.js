"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connGraphQl = void 0;
const apollo_server_express_1 = require("apollo-server-express"); // Import ApolloServer from apollo-server-express
const graphql_tools_1 = require("graphql-tools"); // Import makeExecutableSchema from graphql-tools
const graphql_middleware_1 = require("graphql-middleware"); // Import applyMiddleware from graphql-middleware
const _1 = require("."); // Import typeDefs and resolvers
// Create an executable schema using type definitions and resolvers
const executableSchema = (0, graphql_tools_1.makeExecutableSchema)({ typeDefs: _1.typeDefs, resolvers: _1.resolvers });
// Apply middleware to the executable schema to add functionality
const protectedSchema = (0, graphql_middleware_1.applyMiddleware)(executableSchema);
// Define the connection function to set up Apollo Server with Express
const connGraphQl = async (app) => {
    const server = new apollo_server_express_1.ApolloServer({
        schema: protectedSchema, // Set the schema to the protected schema
        context: ({ req }) => ({
            req, // Set the context to include the request object
        }),
    });
    const port = Number(process.env.PORT || 3000); // Define the port for the server
    // Start the Apollo Server before applying middleware
    await server.start();
    // Apply Apollo Server middleware to Express app
    server.applyMiddleware({ app });
    // Start the server
    app.listen({ port }, () => console.log(`Connected at http://localhost:${port}${server.graphqlPath}`));
};
exports.connGraphQl = connGraphQl;
