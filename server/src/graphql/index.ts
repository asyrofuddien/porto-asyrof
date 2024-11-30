import { gql } from 'apollo-server-express';
import { merge } from 'lodash';
import ProjectTypeDefs from './projects/project.typedef';
import { ProjectResolvers } from './projects/project.resolvers';

// Base type definitions for Query and Mutation
const baseTypeDef = gql`
  type Query
  type Mutation
`;

// Combine all type definitions
const typeDefs = [baseTypeDef, ProjectTypeDefs];

// Merge all resolvers
const resolvers = merge({}, ProjectResolvers);

// Export type definitions and resolvers
export { typeDefs, resolvers };
