"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { postData } from "../../utils/api";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen w-screen flex items-center justify-center px-4 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1f2937,#374151,#4b5563)] opacity-5 mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative">
          {/* Glass Card Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl p-8">
            {/* Back Button */}
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => router.push("/")}
              className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                Create an Account
              </h2>
              <p className="text-gray-400 mt-2">
                Join our community of learners
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300"
                />

                <AnimatePresence mode="wait">
                  {showOtpInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        Resend OTP
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25"
              >
                {showOtpInput ? "Verify & Register" : "Send OTP"}
              </button>
            </motion.form>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Login here
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Toaster position="top-center" />
    </div>
  );
}
