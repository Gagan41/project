"use client";

import { useEffect, useState } from "react";
import { getData } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Video, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Course {
  _id: string;
  title: string;
  description: string;
  modules: Module[];
}

interface Module {
  _id: string;
  title: string;
  description: string;
  videos: Video[];
}

interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeUrl: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getData("/api/courses?populate=modules");

        if (!data) {
          setError("No courses found");
          return;
        }

        if (!Array.isArray(data)) {
          setError("Invalid course data format");
          return;
        }

        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getTotalVideos = (course: Course) => {
    return (
      course.modules?.reduce((total, module) => {
        return total + (module.videos?.length || 0);
      }, 0) || 0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-gray-300">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4f46e5,#7c3aed,#ec4899)] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back to Home</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Available Courses
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Link href={`/courses/${course._id}`} className="block h-full">
                <div className="relative group h-full">
                  {/* Glass Card Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl p-6 h-full flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {course.title}
                    </h2>
                    <p className="text-gray-300 mb-6 flex-grow">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400 pt-4 border-t border-cyan-500/20">
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        {course.modules?.length || 0} modules
                      </span>
                      <span className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-purple-400" />
                        {getTotalVideos(course)} videos
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
