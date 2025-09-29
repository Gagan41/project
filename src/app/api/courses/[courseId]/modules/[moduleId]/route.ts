import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { ModuleModel } from "@/models/Module";
import { CourseModel } from "@/models/Course";
import { VideoModel } from "@/models/Video";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  try {
    await dbConnect();

    // ✅ Await params (because Next.js types require Promise)
    const { courseId, moduleId } = await params;

    if (!courseId || !moduleId) {
      return NextResponse.json(
        { error: "Course ID and Module ID are required" },
        { status: 400 }
      );
    }

    // Verify the course exists
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get the module to delete its videos
    const foundModule = await ModuleModel.findById(moduleId);
    if (!foundModule) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    // Delete all videos associated with the module
    await VideoModel.deleteMany({ module: moduleId });

    // Delete the module
    await ModuleModel.findByIdAndDelete(moduleId);

    // Remove the module from the course's modules array
    await CourseModel.findByIdAndUpdate(courseId, {
      $pull: { modules: moduleId },
    });

    return NextResponse.json({
      message: "Module and its videos deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting module:", error);
    return NextResponse.json(
      {
        error: "Failed to delete module",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
