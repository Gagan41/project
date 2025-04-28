import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import VideoModel from '@/models/Video';
import ModuleModel from '@/models/Module';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string; videoId: string } }
) {
  await dbConnect();
  const { moduleId, videoId } = await params;

  try {
    // Delete the video
    const deletedVideo = await VideoModel.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Remove the video from the module's videos array
    await ModuleModel.findByIdAndUpdate(moduleId, {
      $pull: { videos: videoId }
    });

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
  }
} 