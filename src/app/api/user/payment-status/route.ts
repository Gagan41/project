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

    let hasActivePayment = false;

    switch (payment.plan) {
      case "one-time":
        hasActivePayment = true; // One-time payments never expire
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
