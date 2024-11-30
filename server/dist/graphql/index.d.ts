declare const typeDefs: import("graphql").DocumentNode[];
declare const resolvers: {
    Query: {
        GetAllProjects: () => Promise<import("./projects/project.model").InterfaceProject[]>;
        GetProjectById: (_: any, { _id }: {
            _id: string;
        }) => Promise<import("./projects/project.model").InterfaceProject>;
    };
    Mutation: {
        CreateProject: (_: any, { project_input }: {
            project_input: import("./projects/project.model").InterfaceProject;
        }) => Promise<import("./projects/project.model").InterfaceProject>;
        DeleteProject: (_: any, { _id }: {
            _id: string;
        }) => Promise<import("./projects/project.model").InterfaceProject>;
    };
};
export { typeDefs, resolvers };
