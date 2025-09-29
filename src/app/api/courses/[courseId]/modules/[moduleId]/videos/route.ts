import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { VideoModel } from "@/models/Video";
import { ModuleModel } from "@/models/Module";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  try {
    await dbConnect();

    // ✅ Await params
    const { moduleId } = await params;

    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 }
      );
    }

    const videos = await VideoModel.find({ module: moduleId }).sort({
      createdAt: 1,
    });

    return NextResponse.json(videos);
  } catch (error: unknown) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch videos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  try {
    await dbConnect();

    // ✅ Await params
    const { moduleId } = await params;
    const { title, description, youtubeUrl } = await req.json();

    if (!moduleId) {
      return NextResponse.json(
        { error: "Module ID is required" },
        { status: 400 }
      );
    }

    if (!title || !description || !youtubeUrl) {
      return NextResponse.json(
        { error: "Title, description, and YouTube URL are required" },
        { status: 400 }
      );
    }

    // Verify the module exists
    const foundModule = await ModuleModel.findById(moduleId);
    if (!foundModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    // Create the video
    const video = await VideoModel.create({
      title,
      description,
      youtubeUrl,
      module: moduleId,
    });

    // Add the video to the module's videos array
    await ModuleModel.findByIdAndUpdate(moduleId, {
      $push: { videos: video._id },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      {
        error: "Failed to create video",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
