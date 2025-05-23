"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { postData } from "../../utils/api";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await postData("/api/auth/send-otp", { email, type: "REGISTRATION" });
      setShowOtpInput(true);
      toast.success("OTP sent to your email");
    } catch (err: any) {
      if (err.message.includes("Email already exists")) {
        toast.error("An account with this email already exists");
      } else {
        toast.error(err.message || "Failed to send OTP");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!showOtpInput) {
      await handleSendOTP();
      return;
    }

    try {
      // Verify OTP first
      await postData("/api/auth/verify-otp", {
        email,
        otp,
        type: "REGISTRATION",
      });

      // Proceed with registration
      const { token } = await postData("/api/auth/register", {
        name,
        email,
        password,
      });
      login(token);
      toast.success(
        "Registration successful! Please select a plan to continue."
      );
      router.push("/payment");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 text-white overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <Toaster position="top-center" />

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-sm text-purple-400 hover:text-white transition"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </button>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />

          {showOtpInput && (
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

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded transition text-white font-semibold"
          >
            {showOtpInput ? "Verify & Register" : "Send OTP"}
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
