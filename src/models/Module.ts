import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ModuleDoc extends Document {
  title: string;
  description: string;
  course: mongoose.Types.ObjectId;
  videos: mongoose.Types.ObjectId[];
}

const ModuleSchema = new Schema<ModuleDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  },
  { timestamps: true }
);

let ModuleModel: Model<ModuleDoc>;
try {
  ModuleModel = mongoose.model<ModuleDoc>('Module');
} catch {
  ModuleModel = mongoose.model<ModuleDoc>('Module', ModuleSchema);
}

export default ModuleModel; 