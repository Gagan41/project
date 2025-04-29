import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { CourseModel } from '@/models/Course';
import { ModuleModel } from '@/models/Module';
import { VideoModel } from '@/models/Video';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await dbConnect();
    const { courseId } = await params;

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' }, 
        { status: 400 }
      );
    }

    // Get the course and its modules
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Get all modules for this course
    const modules = await ModuleModel.find({ course: courseId });

    // Delete all videos associated with the modules
    for (const module of modules) {
      await VideoModel.deleteMany({ module: module._id });
    }

    // Delete all modules
    await ModuleModel.deleteMany({ course: courseId });

    // Delete the course
    await CourseModel.findByIdAndDelete(courseId);

    return NextResponse.json({ message: 'Course and all associated modules and videos deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await dbConnect();
    const { courseId } = await params;

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' }, 
        { status: 400 }
      );
    }

    // Find the course and populate its modules and videos
    const course = await CourseModel.findById(courseId)
      .populate({
        path: 'modules',
        populate: {
          path: 'videos'
        }
      });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}
