"use server";

import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";
import { getData } from "@/utils/api";
import { headers } from "next/headers";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export type RazorpayResponseType = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

// Base prices in rupees
const PLAN_PRICES = {
  "one-time": 2999.0,
  "3-month": 1199.0,
  monthly: 499.0,
};

// Function to ensure last decimal is 0
function adjustAmount(amount: number): number {
  // Convert to paise and ensure last digit is 0
  const amountInPaise = Math.floor(amount * 100);
  return amountInPaise - (amountInPaise % 10);
}

export async function createPaymentOrder(
  plan: "one-time" | "3-month" | "monthly",
  token: string
) {
  if (!token) {
    throw new Error("User not authenticated");
  }

  // Get user profile
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const userData = await getData(
    `${protocol}://${host}/api/user/profile`,
    token
  );

  if (!userData || !userData._id) {
    throw new Error("User not found or invalid user data");
  }

  await dbConnect();

  const baseAmount = PLAN_PRICES[plan];
  const adjustedAmount = adjustAmount(baseAmount);

  const options = {
    amount: adjustedAmount, // Already in paise with last digit as 0
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  // Create payment record with explicit userId
  const payment = await Payment.create({
    userId: userData._id.toString(),
    plan,
    amount: baseAmount, // Store original amount
    orderId: order.id,
    status: "pending",
  });

  return {
    orderId: order.id,
    amount: order.amount,
    key: process.env.RAZORPAY_KEY_ID,
    paymentId: payment._id.toString(),
  };
}

export async function verifyPayment(
  paymentId: string,
  response: RazorpayResponseType
) {
  await dbConnect();

  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.orderId !== response.razorpay_order_id) {
    throw new Error("Order ID mismatch");
  }

  const isValidSignature = validateWebhookSignature(
    `${response.razorpay_order_id}|${response.razorpay_payment_id}`,
    response.razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET!
  );

  if (isValidSignature) {
    payment.status = "completed";
    payment.paymentId = response.razorpay_payment_id;
    await payment.save();
    return true;
  }

  return false;
}
