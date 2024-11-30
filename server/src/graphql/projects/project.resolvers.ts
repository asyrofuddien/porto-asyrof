// *************** LIBRARY ***************
import { ApolloError } from 'apollo-server-express';

// *************** MODEL ***************
import { ProjectModel, InterfaceProject } from './project.model';

// *************** RESOLVERS ***************
const GetAllProjects = async (): Promise<InterfaceProject[]> => {
  try {
    const projects = await ProjectModel.find({ status: 'active' });
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

const GetProjectById = async (_: any, { _id }: { _id: string }): Promise<InterfaceProject> => {
  try {
    const project = await ProjectModel.findById(_id);
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

// *************** MUTATION ***************
async function CreateProject(_: any, { project_input }: { project_input: InterfaceProject }): Promise<InterfaceProject> {
  if (!project_input) {
    throw new ApolloError('Missing Parameter: project_input');
  }

  // Find a project with the same name and status 'active'
  const projectExists = await ProjectModel.findOne({
    status: 'active',
    project_name: project_input.project_name,
  })
    .select('_id')
    .lean();

  if (projectExists) {
    throw new ApolloError('Project with the same name already exists');
  }

  // Create a new project (assuming the model is set up correctly)
  const newProject = await ProjectModel.create(project_input);

  if (!newProject) {
    throw new ApolloError('Missing Parameter: project_input');
  }

  return newProject;
}

async function DeleteProject(_: any, { _id }: { _id: string }): Promise<InterfaceProject> {
  // *************** Find a project with the same name and status 'active'
  const projectExists = await ProjectModel.findByIdAndUpdate(_id, {
    status: 'deleted',
  });

  if (!projectExists) {
    throw new ApolloError('Project with the id not found');
  }

  return projectExists;
}

// *************** EXPORT ***************
export const ProjectResolvers = {
  Query: {
    GetAllProjects,
    GetProjectById,
  },
  Mutation: {
    CreateProject,
    DeleteProject,
  },
};
