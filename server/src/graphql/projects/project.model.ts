import mongoose, { Schema, Document } from 'mongoose';

// Define the TypeScript interface for the Project model
interface InterfaceProject extends Document {
  project_name: string;
  description: string;
  link: string;
  image: string;
  tatus: 'active' | 'deleted';
}

// Create a schema for the Project model
const ProjectSchema: Schema = new Schema(
  {
    project_name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive', 'completed'], default: 'active' },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the model from the schema
const ProjectModel = mongoose.model<InterfaceProject>('Project', ProjectSchema);

export { ProjectModel, InterfaceProject };
