"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = require("lodash");
const project_typedef_1 = __importDefault(require("./projects/project.typedef"));
const project_resolvers_1 = require("./projects/project.resolvers");
// Base type definitions for Query and Mutation
const baseTypeDef = (0, apollo_server_express_1.gql) `
  type Query
  type Mutation
`;
// Combine all type definitions
const typeDefs = [baseTypeDef, project_typedef_1.default];
exports.typeDefs = typeDefs;
// Merge all resolvers
const resolvers = (0, lodash_1.merge)({}, project_resolvers_1.ProjectResolvers);
exports.resolvers = resolvers;
