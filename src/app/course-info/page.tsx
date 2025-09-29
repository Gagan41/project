"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function CourseInfoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1f2937,#374151,#4b5563)] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back to Home</span>
        </motion.button>

        {/* Main Content */}
        <div className="relative">
          {/* Glass Card Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl p-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              Mastering Communication & English Fluency
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-300 text-lg mb-8 leading-relaxed"
            >
              This course is designed to transform your English speaking
              abilities, boost your confidence, and sharpen your communication
              skills — whether youre preparing for a job interview, aiming to
              ace public speaking, or simply want to speak English with fluency
              and finesse.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                  What You Learn:
                </h2>
                <ul className="space-y-3">
                  {[
                    "Build fluency through real-life conversations and speaking drills",
                    "Master body language, tone, and professional etiquette",
                    "Eliminate hesitation and nervousness while speaking",
                    "Improve pronunciation and vocabulary usage",
                    "Write and deliver impactful speeches and presentations",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3 text-gray-200"
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                  Who Is This Course For?
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  If youre a student, job seeker, entrepreneur, or anyone
                  looking to enhance your communication skills and express
                  yourself confidently in English — this course is for you!
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                  Duration & Format
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400">📅</span> 6 Weeks
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400">🎥</span> Video Modules
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400">📝</span> Practical
                    Assignments
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400">🎤</span> Live Sessions
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <button
                onClick={() => router.push("/courses")}
                className="px-8 py-4 bg-yellow-400 text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25"
              >
                Explore Courses
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
