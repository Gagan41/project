import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { VideoModel } from '@/models/Video';
import { ModuleModel } from '@/models/Module';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string; videoId: string } }
) {
  try {
    await dbConnect();
    const { moduleId, videoId } = await params;

    if (!moduleId || !videoId) {
      return NextResponse.json(
        { error: 'Module ID and Video ID are required' }, 
        { status: 400 }
      );
    }

    // Verify the module exists
    const module = await ModuleModel.findById(moduleId);
    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

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
    console.error('Error deleting video:', error);
    return NextResponse.json(
      { error: 'Failed to delete video', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
} 