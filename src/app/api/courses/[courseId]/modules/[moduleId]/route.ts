import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import ModuleModel from '@/models/Module';
import CourseModel from '@/models/Course';
import VideoModel from '@/models/Video';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  await dbConnect();
  const { courseId, moduleId } = await params;

  try {
    // Delete all videos associated with the module
    await VideoModel.deleteMany({ module: moduleId });

    // Delete the module
    const deletedModule = await ModuleModel.findByIdAndDelete(moduleId);
    if (!deletedModule) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    // Remove the module from the course's modules array
    await CourseModel.findByIdAndUpdate(courseId, {
      $pull: { modules: moduleId }
    });

    return NextResponse.json({ message: 'Module deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete module' }, { status: 500 });
  }
} 