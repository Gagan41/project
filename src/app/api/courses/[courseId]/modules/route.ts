import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { ModuleModel } from '@/models/Module';
import { CourseModel } from '@/models/Course';

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await dbConnect();
    const { courseId } = await params;
    
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const modules = await ModuleModel.find({ course: courseId })
      .populate('videos')
      .sort({ createdAt: 1 });
    
    return NextResponse.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    await dbConnect();
    const { courseId } = await params;
    const { title, description } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' }, 
        { status: 400 }
      );
    }

    // Verify the course exists
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Create the module
    const module = await ModuleModel.create({
      title,
      description,
      course: courseId,
    });

    // Add the module to the course's modules array
    await CourseModel.findByIdAndUpdate(courseId, {
      $push: { modules: module._id }
    });

    // Populate the module with videos before returning
    const populatedModule = await ModuleModel.findById(module._id).populate('videos');

    return NextResponse.json(populatedModule, { status: 201 });
  } catch (error) {
    console.error('Error creating module:', error);
    return NextResponse.json(
      { error: 'Failed to create module', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
} 