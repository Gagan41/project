// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import CourseModel from '@/models/Course';

export async function GET() {
  await dbConnect();
  const courses = await CourseModel.find({}, { title: 1, description: 1, _id: 1 });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const { title, description } = await req.json();
  const course = await CourseModel.create({ title, description });
  return NextResponse.json(course, { status: 201 });
}
