import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import OTP from "../../../../models/OTP";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, newPassword } = await req.json();

    // Verify that OTP was verified
    const otpRecord = await OTP.findOne({
      email,
      type: "PASSWORD_RESET",
      verified: true,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Please verify your email first" },
        { status: 400 }
      );
    }

    // Update password
    const hash = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { passwordHash: hash });

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
