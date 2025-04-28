import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import VideoModel from '@/models/Video';
import ModuleModel from '@/models/Module';

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  await dbConnect();
  const { moduleId } = await params;

  try {
    const videos = await VideoModel.find({ module: moduleId })
      .sort({ createdAt: 1 });
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  await dbConnect();
  const { moduleId } = await params;
  const { title, description, youtubeUrl } = await req.json();

  try {
    // Create the video
    const video = await VideoModel.create({
      title,
      description,
      youtubeUrl,
      module: moduleId,
    });

    // Add the video to the module's videos array
    await ModuleModel.findByIdAndUpdate(moduleId, {
      $push: { videos: video._id }
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
} 