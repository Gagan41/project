"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postData } from "../../utils/api";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await postData("/api/auth/send-otp", { email, type: "PASSWORD_RESET" });
      setShowOtpInput(true);
      toast.success("OTP sent to your email");
    } catch (err: any) {
      // Handle specific error messages
      if (err.message === "No account found with this email") {
        toast.error("No account found with this email address");
      } else {
        toast.error("Failed to send OTP. Please try again later.");
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      await postData("/api/auth/verify-otp", {
        email,
        otp,
        type: "PASSWORD_RESET",
      });
      setShowNewPasswordInput(true);
      toast.success("OTP verified successfully");
    } catch (err: any) {
      if (err.message.includes("Invalid or expired")) {
        toast.error("Invalid or expired OTP. Please try again.");
      } else {
        toast.error("Failed to verify OTP. Please try again later.");
      }
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      await postData("/api/auth/reset-password", { email, newPassword });
      toast.success("Password reset successful");
      router.push("/login");
    } catch (err: any) {
      toast.error("Failed to reset password. Please try again later.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtpInput) {
      await handleSendOTP();
    } else if (!showNewPasswordInput) {
      await handleVerifyOTP();
    } else {
      await handleResetPassword();
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 text-white overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <Toaster position="top-center" />

        {/* Back Button */}
        <button
          onClick={() => router.push("/login")}
          className="flex items-center text-sm text-purple-400 hover:text-white transition"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Login
        </button>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">Reset Password</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />

          {showOtpInput && !showNewPasswordInput && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
              />
              <button
                type="button"
                onClick={handleSendOTP}
                className="text-sm text-purple-400 hover:text-white"
              >
                Resend OTP
              </button>
            </div>
          )}

          {showNewPasswordInput && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded transition text-white font-semibold"
          >
            {!showOtpInput
              ? "Send OTP"
              : !showNewPasswordInput
                ? "Verify OTP"
                : "Reset Password"}
          </button>

          <p className="text-sm text-center text-gray-400">
            Remember your password?{" "}
            <Link href="/login" className="text-purple-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
