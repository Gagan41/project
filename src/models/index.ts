import mongoose from 'mongoose';
import { CourseModel } from './Course';
import { ModuleModel } from './Module';
import { VideoModel } from './Video';

// Export all models
export { CourseModel, ModuleModel, VideoModel };

// Ensure models are registered
export function registerModels() {
  try {
    mongoose.model('Course');
  } catch {
    mongoose.model('Course', CourseModel.schema);
  }

  try {
    mongoose.model('Module');
  } catch {
    mongoose.model('Module', ModuleModel.schema);
  }

  try {
    mongoose.model('Video');
  } catch {
    mongoose.model('Video', VideoModel.schema);
  }
}
