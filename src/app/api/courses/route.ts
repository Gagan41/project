// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { CourseModel } from '@/models/Course';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const url = new URL(req.url);
    const shouldPopulate = url.searchParams.get('populate') === 'modules';

    let query = CourseModel.find({});
    
    if (shouldPopulate) {
      query = query.populate({
        path: 'modules',
        populate: {
          path: 'videos'
        }
      });
    }

    const courses = await query;
    
    if (!courses) {
      return NextResponse.json({ error: 'No courses found' }, { status: 404 });
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' }, 
        { status: 400 }
      );
    }

    const course = await CourseModel.create({ title, description });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}
