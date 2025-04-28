// models/Course.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CourseDoc extends Document {
  title:       string;
  description: string;
  modules:     mongoose.Types.ObjectId[];
}

const CourseSchema = new Schema<CourseDoc>(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    modules:     [{ type: Schema.Types.ObjectId, ref: 'Module' }],
  },
  { timestamps: true }
);

// Ensure the model is registered only once
let CourseModel: Model<CourseDoc>;
try {
  CourseModel = mongoose.model<CourseDoc>('Course');
} catch {
  CourseModel = mongoose.model<CourseDoc>('Course', CourseSchema);
}

export { CourseModel };
