import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import OTP from "../../../../models/OTP";
import { sendOTPEmail } from "../../../../utils/emailService";
import User from "../../../../models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, type } = await req.json();

    // Check if user exists for password reset
    if (type === "PASSWORD_RESET") {
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email" },
          { status: 404 }
        );
      }
    }
    // Check if email exists for registration
    else if (type === "REGISTRATION") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email, type },
      { otp, expiresAt, verified: false },
      { upsert: true, new: true }
    );

    // Send OTP email
    await sendOTPEmail(email, otp, type);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error: unknown) {
    console.error("Send OTP error:", error);

    if (error instanceof Error) {
      // If it's a known error, return it with appropriate status
      if (error.message === "No account found with this email") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fallback for non-Error values
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
