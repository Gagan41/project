import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../utils/dbConnect'
import Order from '../../../models/Order'
import Course from '../../../models/Course'

export async function POST(req: NextRequest) {
  await dbConnect()
  const { name, address, phone, courseId } = await req.json()
  // TODO: integrate Phone-PG SDK here to create payment
  const course = await Course.findById(courseId)
  const order = await Order.create({ user: null, course: courseId, amount: course?.price, status: 'pending' })
  return NextResponse.json({ orderId: order._id })
}