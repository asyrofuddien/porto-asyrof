"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolvers = void 0;
// *************** LIBRARY ***************
const apollo_server_express_1 = require("apollo-server-express");
// *************** MODEL ***************
const project_model_1 = require("./project.model");
// *************** RESOLVERS ***************
const GetAllProjects = async () => {
    try {
        const projects = await project_model_1.ProjectModel.find({ status: 'active' });
        return projects;
    }
    catch (error) {
        if (error instanceof Error) {
            // If it's an Error, access the 'message' property
            throw new Error('Error fetching projects: ' + error.message);
        }
        else {
            // If it's not an instance of Error, throw a generic error
            throw new Error('An unknown error occurred while fetching projects');
        }
    }
};
const GetProjectById = async (_, { _id }) => {
    try {
        const project = await project_model_1.ProjectModel.findById(_id);
        if (!project) {
            throw new Error('Project not found');
        }
        return project;
    }
    catch (error) {
        if (error instanceof Error) {
            // If it's an Error, access the 'message' property
            throw new Error('Error fetching projects: ' + error.message);
        }
        else {
            // If it's not an instance of Error, throw a generic error
            throw new Error('An unknown error occurred while fetching projects');
        }
    }
};
// *************** MUTATION ***************
async function CreateProject(_, { project_input }) {
    if (!project_input) {
        throw new apollo_server_express_1.ApolloError('Missing Parameter: project_input');
    }
    // Find a project with the same name and status 'active'
    const projectExists = await project_model_1.ProjectModel.findOne({
        status: 'active',
        project_name: project_input.project_name,
    })
        .select('_id')
        .lean();
    if (projectExists) {
        throw new apollo_server_express_1.ApolloError('Project with the same name already exists');
    }
    // Create a new project (assuming the model is set up correctly)
    const newProject = await project_model_1.ProjectModel.create(project_input);
    if (!newProject) {
        throw new apollo_server_express_1.ApolloError('Missing Parameter: project_input');
    }
    return newProject;
}
async function DeleteProject(_, { _id }) {
    // *************** Find a project with the same name and status 'active'
    const projectExists = await project_model_1.ProjectModel.findByIdAndUpdate(_id, {
        status: 'deleted',
    });
    if (!projectExists) {
        throw new apollo_server_express_1.ApolloError('Project with the id not found');
    }
    return projectExists;
}
// *************** EXPORT ***************
exports.ProjectResolvers = {
    Query: {
        GetAllProjects,
        GetProjectById,
    },
    Mutation: {
        CreateProject,
        DeleteProject,
    },
};
