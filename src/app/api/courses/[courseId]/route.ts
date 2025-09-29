import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { CourseModel } from "@/models/Course";
import { ModuleModel } from "@/models/Module";
import { VideoModel } from "@/models/Video";

// ✅ Delete a course and all its modules + videos
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await dbConnect();
    const { courseId } = await context.params; // ✅ must await

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Get the course
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get all modules
    const modules = await ModuleModel.find({ course: courseId });

    // Delete videos in each module
    for (const mod of modules) {
      await VideoModel.deleteMany({ module: mod._id });
    }

    // Delete all modules
    await ModuleModel.deleteMany({ course: courseId });

    // Delete the course
    await CourseModel.findByIdAndDelete(courseId);

    return NextResponse.json({
      message:
        "Course and all associated modules and videos deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      {
        error: "Failed to delete course",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// ✅ Get a course with its modules and videos
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await dbConnect();
    const { courseId } = await context.params; // ✅ must await

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Populate modules and their videos
    const course = await CourseModel.findById(courseId).populate({
      path: "modules",
      populate: { path: "videos" },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error: unknown) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch course",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
