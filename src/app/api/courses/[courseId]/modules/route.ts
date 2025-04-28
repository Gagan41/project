import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import ModuleModel from '@/models/Module';
import CourseModel from '@/models/Course';

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();
  const { courseId } = await params;
  
  try {
    const modules = await ModuleModel.find({ course: courseId })
      .populate('videos')
      .sort({ createdAt: 1 });
    return NextResponse.json(modules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();
  const { courseId } = await params;
  const { title, description } = await req.json();

  try {
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

    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }
} 