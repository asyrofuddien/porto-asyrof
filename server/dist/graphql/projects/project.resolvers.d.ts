import { InterfaceProject } from './project.model';
declare function CreateProject(_: any, { project_input }: {
    project_input: InterfaceProject;
}): Promise<InterfaceProject>;
declare function DeleteProject(_: any, { _id }: {
    _id: string;
}): Promise<InterfaceProject>;
export declare const ProjectResolvers: {
    Query: {
        GetAllProjects: () => Promise<InterfaceProject[]>;
        GetProjectById: (_: any, { _id }: {
            _id: string;
        }) => Promise<InterfaceProject>;
    };
    Mutation: {
        CreateProject: typeof CreateProject;
        DeleteProject: typeof DeleteProject;
    };
};
export {};
