import { gql } from 'apollo-server-express';
import { merge } from 'lodash';
import ProjectTypeDefs from './projects/project.typedef';

// Define GraphQL type definitions
const typeDef = gql`
  type Query
  type Mutation
`;

// Type definitions as an array
const typeDefs = [typeDef, ProjectTypeDefs];

// Define resolvers (initially empty, will expand as needed)
let resolvers: Record<string, any> = {};

// Merge additional resolvers (placeholder for adding more resolvers later)
resolvers = merge(resolvers);

// Export type definitions and resolvers
export { typeDefs, resolvers };
