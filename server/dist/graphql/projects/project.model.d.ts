import mongoose, { Document } from 'mongoose';
interface InterfaceProject extends Document {
    _id: string;
    project_name: string;
    description: string;
    link: string;
    image: string;
    tatus: 'active' | 'deleted';
}
declare const ProjectModel: mongoose.Model<InterfaceProject, {}, {}, {}, mongoose.Document<unknown, {}, InterfaceProject> & InterfaceProject & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { ProjectModel, InterfaceProject };
