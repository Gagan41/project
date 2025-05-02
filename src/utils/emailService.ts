import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use App Password for Gmail
  },
});

export async function sendOTPEmail(
  email: string,
  otp: string,
  type: "REGISTRATION" | "PASSWORD_RESET"
) {
  const subject =
    type === "REGISTRATION"
      ? "Verify Your Email Address"
      : "Password Reset Verification";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6B46C1;">${subject}</h2>
      <p>Your verification code is:</p>
      <h1 style="color: #6B46C1; font-size: 32px; letter-spacing: 5px; text-align: center; padding: 20px; background: #F3F4F6; border-radius: 8px;">${otp}</h1>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this code, please ignore this email.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
}
