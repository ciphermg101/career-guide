import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  url: string;
  type: string;
  description?: string;
}

const ResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<IResource>('Resource', ResourceSchema); 