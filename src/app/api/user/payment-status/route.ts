import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

function verifyToken(token?: string) {
  if (!token) throw new Error("No token");
  return (jwt.verify(token, JWT_SECRET) as { userId: string }).userId;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const userId = verifyToken(token);
    await dbConnect();

    // Find the most recent completed payment
    const payment = await Payment.findOne({
      userId,
      status: "completed",
    }).sort({ createdAt: -1 });

    if (!payment) {
      return NextResponse.json({ hasActivePayment: false });
    }

    // Check if the payment is still valid based on the plan
    const now = new Date();
    let hasActivePayment = false;

    switch (payment.plan) {
      case "one-time":
        hasActivePayment = true; // One-time payments never expire
        break;
      case "3-month":
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        hasActivePayment = payment.createdAt > threeMonthsAgo;
        break;
      case "monthly":
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        hasActivePayment = payment.createdAt > oneMonthAgo;
        break;
    }

    return NextResponse.json({ hasActivePayment });
  } catch (error) {
    console.error("Payment status check error:", error);
    return NextResponse.json(
      { error: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
