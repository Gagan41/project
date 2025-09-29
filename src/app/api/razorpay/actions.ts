"use server";

import Razorpay from "razorpay";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";
import { getData } from "@/utils/api";
import { headers } from "next/headers";

export type RazorpayResponseType = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

// Base prices in rupees
const PLAN_PRICES = {
  "one-time": 9733.0,
};

// Function to ensure last decimal is 0
function adjustAmount(amount: number): number {
  // Convert to paise and ensure last digit is 0
  const amountInPaise = Math.floor(amount * 100);
  return amountInPaise - (amountInPaise % 10);
}

// Define UserProfile shape
interface UserProfile {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export async function createPaymentOrder(plan: "one-time", token: string) {
  if (!token) {
    throw new Error("User not authenticated");
  }

  // Check if environment variables are available
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("Razorpay credentials missing:", {
      keyId: process.env.RAZORPAY_KEY_ID ? "present" : "missing",
      keySecret: process.env.RAZORPAY_KEY_SECRET ? "present" : "missing",
    });
    throw new Error("Razorpay credentials not configured");
  }

  // Initialize Razorpay with explicit credentials
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Get user profile
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const userData = (await getData(
    `${protocol}://${host}/api/user/profile`,
    token
  )) as UserProfile;

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

  try {
    const order = await razorpay.orders.create(options);

    // Create payment record with explicit userId
    const payment = await Payment.create({
      userId: userData._id.toString(),
      plan,
      amount: baseAmount, // Store original amount
      orderId: order.id,
      status: "pending",
      name: userData.name || "Unknown", // fallback if missing
      email: userData.email || "N/A",
      phone: userData.phone || "N/A",
      address: userData.address || "N/A",
    });

    return {
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
      paymentId: payment._id.toString(),
    };
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw error;
  }
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
