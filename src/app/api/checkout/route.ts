import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../utils/dbConnect'
import Payment from '@/models/Payment'
import { CourseModel } from '@/models/Course'


export async function POST(req: NextRequest) {
  await dbConnect()
  const { name, address, phone, courseId } = await req.json()

  const course = await CourseModel.findById(courseId)
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  // TODO: integrate Phone-PG SDK here to create payment

  const payment = await Payment.create({
    user: null,           // optionally set the user ID here
    course: courseId,
    amount: course.price,
    status: 'pending',
    name,
    address,
    phone,
  })

  return NextResponse.json({ paymentId: payment._id })
}

