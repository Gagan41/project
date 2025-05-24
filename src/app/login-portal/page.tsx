"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function LoginPortal() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4f46e5,#7c3aed,#ec4899)] opacity-5 mix-blend-overlay" />
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="relative">
          {/* Glass Card Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl p-8 sm:p-10">
            {/* Back Button */}
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => router.push("/")}
              className="absolute top-6 left-6 text-cyan-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative mx-auto w-24 h-24 mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-25 animate-pulse"></div>
              <Image
                src="/img.jpg"
                alt="Logo"
                width={100}
                height={100}
                className="relative rounded-full border-2 border-cyan-500/20 shadow-lg shadow-cyan-500/20"
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                The Communication Mastery Portal
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-lg text-gray-300 mb-6 px-4 leading-relaxed text-center max-w-2xl mx-auto"
            >
              Login to{" "}
              <span className="font-semibold text-white">
                Communication Mastery
              </span>{" "}
              — your gateway to eloquence and influence.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-cyan-300 italic mb-10 px-6 leading-relaxed text-center max-w-xl mx-auto"
            >
              Stop being misunderstood. Start{" "}
              <span className="font-bold text-white">
                speaking with clarity
              </span>
              .
            </motion.p>

            {/* Register link + Login button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white border border-purple-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                I don't have an account
              </Link>

              <button
                onClick={() => router.push("/login")}
                className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                LOG IN
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
