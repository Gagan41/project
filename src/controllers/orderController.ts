import Order from '../models/Order'
import Course from '../models/Course'

interface CheckoutDTO { courseId: string; name: string; address: string; phone: string }

export async function createOrder({ courseId, name, address, phone }: CheckoutDTO) {
  const course = await Course.findById(courseId)
  if (!course) throw new Error('Course not found')
  // integrate Phone-PG here
  const order = await Order.create({ user: null, course: courseId, amount: course.price, paymentId: '', status: 'pending' })
  return order
}