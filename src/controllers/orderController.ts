import Order from "../models/Order";
import { CourseModel } from "../models/Course";

interface CheckoutDTO {
  courseId: string;
  name: string;
  address: string;
  phone: string;
}

export async function createOrder({
  courseId,
  name,
  address,
  phone,
}: CheckoutDTO) {
  const course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");

  // TODO: integrate Phone-PG here (payment gateway)

  const order = await Order.create({
    user: null, // you can set the user ID here if available
    course: courseId,
    amount: course.price,
    paymentId: "", // will be updated after successful payment
    status: "pending",
    name,
    address,
    phone,
  });

  return order;
}
