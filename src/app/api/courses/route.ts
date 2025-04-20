import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../utils/dbConnect'
import Course from '../../../models/Course'

export async function GET() {
  await dbConnect()
  const course = await Course.findOne()
  return NextResponse.json(course)
}