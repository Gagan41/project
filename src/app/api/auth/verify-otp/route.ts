import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import OTP from "../../../../models/OTP";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, otp, type } = await req.json();

    const otpRecord = await OTP.findOne({
      email,
      otp,
      type,
      expiresAt: { $gt: new Date() },
      verified: false,
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error: unknown) {
    console.error("Verify OTP error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to verify OTP";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
