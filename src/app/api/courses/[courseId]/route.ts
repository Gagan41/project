import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import CourseModel from '@/models/Course';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  await dbConnect();
  const { courseId } = await params;
  const deleted = await CourseModel.findByIdAndDelete(courseId);
  if (!deleted) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Course deleted', courseId }, { status: 200 });
}
