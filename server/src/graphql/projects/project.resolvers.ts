import { ApolloError } from 'apollo-server-express';
import { ProjectModel, InterfaceProject } from './project.model';

// Resolver to get all projects
const GetAllProjects = async (): Promise<InterfaceProject[]> => {
  try {
    const projects = await ProjectModel.find();
    return projects;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // If it's an Error, access the 'message' property
      throw new Error('Error fetching projects: ' + error.message);
    } else {
      // If it's not an instance of Error, throw a generic error
      throw new Error('An unknown error occurred while fetching projects');
    }
  }
};

// Resolver to get a project by its ID
const GetProjectById = async (_: any, { id }: { id: string }): Promise<InterfaceProject> => {
  try {
    const project = await ProjectModel.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (error) {
    if (error instanceof Error) {
      // If it's an Error, access the 'message' property
      throw new Error('Error fetching projects: ' + error.message);
    } else {
      // If it's not an instance of Error, throw a generic error
      throw new Error('An unknown error occurred while fetching projects');
    }
  }
};

async function CreateProject(_: any, { project_input }: { project_input: InterfaceProject }): Promise<InterfaceProject> {
  if (!project_input) {
    throw new ApolloError('Missing Parameter: project_input');
  }

  // Find a project with the same name and status 'active'
  const projectExists = await ProjectModel.findOne({
    status: 'active',
    project_name: project_input.project_name, // Corrected property name
  });

  if (projectExists) {
    throw new ApolloError('Project with the same name already exists');
  }

  // Create a new project (assuming the model is set up correctly)
  const newProject = new ProjectModel(project_input);
  await newProject.save();

  return newProject; // Return the newly created project
}

// Export resolvers
export const resolvers = {
  Query: {
    GetAllProjects,
    GetProjectById,
  },
  Mutation: {
    // Add Mutation resolvers here (Create, Update, Delete)
  },
};
