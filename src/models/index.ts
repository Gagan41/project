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
    CourseModel;
  }

  try {
    mongoose.model('Module');
  } catch {
    ModuleModel;
  }

  try {
    mongoose.model('Video');
  } catch {
    VideoModel;
  }
} 