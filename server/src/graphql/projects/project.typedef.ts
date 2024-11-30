import { gql } from 'apollo-server-express';

const ProjectTypeDefs = gql`
  # Define the Project type
  type Project {
    # Unique identifier for the project
    _id: ID!
    # Name of the project
    project_name: String!
    # Description of the project
    description: String!
    # GitHub or related link for the project
    link: String!
    # URL of the project's image
    image: String!
  }

  input ProjectInput {
    project_name: String!
    description: String!
    link: String
    image: String
  }

  # Define the Query type
  type Query {
    # Query to get all projects
    GetAllProjects: [Project!]!

    # Query to get a single project by its ID
    GetProjectById(id: ID!): Project
  }

  # Define the Mutation type
  type Mutation {
    # Create a new project
    CreateProject(project_input: ProjectInput): Project!

    # Update an existing project
    UpdateProject(id: ID!, project_input: ProjectInput): Project!

    # Delete an existing project
    DeleteProject(id: ID!): Project!
  }
`;

export default ProjectTypeDefs;
