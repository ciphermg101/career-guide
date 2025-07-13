import mongoose, { Schema, Document } from 'mongoose';

export interface ICareer extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  skills: string[];
  learningPaths: string[];
  resources: mongoose.Types.ObjectId[];
  dailyTasks: string[];
  description?: string;
}

const CareerSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  skills: [{ type: String, required: true }],
  learningPaths: [{ type: String }],
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
  dailyTasks: [{ type: String }],
  description: { type: String },
});

export default mongoose.model<ICareer>('Career', CareerSchema); 