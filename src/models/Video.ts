import mongoose, { Schema, Document, Model } from 'mongoose';

export interface VideoDoc extends Document {
  title: string;
  description: string;
  youtubeUrl: string;
  module: mongoose.Types.ObjectId;
}

const VideoSchema = new Schema<VideoDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
  },
  { timestamps: true }
);

let VideoModel: Model<VideoDoc>;
try {
  VideoModel = mongoose.model<VideoDoc>('Video');
} catch {
  VideoModel = mongoose.model<VideoDoc>('Video', VideoSchema);
}

export default VideoModel; 