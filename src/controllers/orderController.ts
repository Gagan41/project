import Payment from "../models/Payment";
import { CourseModel } from "../models/Course";

interface CheckoutDTO {
  courseId: string;
  name: string;
  address: string;
  phone: string;
  userId: string;
}

export async function createPayment({
  courseId,
  name,
  address,
  phone,
  userId,
}: CheckoutDTO) {
  const course = await CourseModel.findById(courseId);
  if (!course) throw new Error("Course not found");

  // TODO: integrate Phone-PG here (payment gateway)

  const payment = await Payment.create({
    userId,
    plan: "one-time",
    amount: course.price,
    orderId: "", // will be set from PG response
    paymentId: "", // will be updated after successful payment
    status: "pending",
    name,
    address,
    phone,
  });

  return payment;
}
