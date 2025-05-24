"use client";
import { useState, useEffect } from "react";
import { getData } from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, BookOpen, Loader2 } from "lucide-react";
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

export default function CoursePage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const data = await getData(`/api/courses/${courseId}`);
        if (!data) {
          setError("Course not found");
          return;
        }

        setCourse(data);

        if (data.modules && data.modules.length > 0) {
          setSelectedModule(data.modules[0]);
          if (data.modules[0].videos && data.modules[0].videos.length > 0) {
            setSelectedVideo(data.modules[0].videos[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch course", err);
        setError("Failed to load course. Please try again later.");
      }
    };

    fetchCourse();
  }, [courseId, router]);

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-gray-300">Loading course content...</p>
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/courses")}
          className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back to Courses</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {course.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {course.description}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with modules */}
          <div className="w-full lg:w-1/4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl p-4 h-[calc(100vh-200px)] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-900/80 backdrop-blur-sm py-2 z-10">
                  Modules
                </h2>
                <div className="space-y-3">
                  {course.modules?.map((module) => (
                    <motion.button
                      key={module._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => {
                        setSelectedModule(module);
                        if (module.videos?.length > 0) {
                          setSelectedVideo(module.videos[0]);
                        } else {
                          setSelectedVideo(null);
                        }
                      }}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        selectedModule?._id === module._id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
                          : "bg-gray-800/50 hover:bg-gray-800 hover:shadow-lg hover:shadow-cyan-500/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-white">
                          {module.title}
                        </h3>
                        <span className="flex items-center gap-1 text-sm text-gray-300">
                          <BookOpen className="w-4 h-4" />
                          {module.videos?.length || 0}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-2">
                        {module.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {selectedModule ? (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
                      {selectedModule.title}
                    </h2>
                    <p className="text-gray-300 mb-8">
                      {selectedModule.description}
                    </p>

                    {/* Video list */}
                    <div className="space-y-4 mb-8">
                      {selectedModule.videos?.map((video, index) => (
                        <motion.div
                          key={video._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.4 + index * 0.1,
                            duration: 0.5,
                          }}
                          className={`relative group cursor-pointer transition-all duration-300 ${
                            selectedVideo?._id === video._id
                              ? "ring-2 ring-purple-500"
                              : "hover:ring-1 hover:ring-cyan-500/50"
                          }`}
                          onClick={() => setSelectedVideo(video)}
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                          <div className="relative bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Play className="w-5 h-5 text-cyan-400" />
                              <h3 className="font-medium text-white">
                                {video.title}
                              </h3>
                            </div>
                            <p className="text-gray-300 mt-2 ml-8">
                              {video.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Video player */}
                    {selectedVideo && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mt-8"
                      >
                        <div className="w-full max-w-[640px] mx-auto">
                          <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20">
                            <iframe
                              src={`https://www.youtube.com/embed/${extractVideoId(selectedVideo.youtubeUrl)}?modestbranding=1&rel=0`}
                              title={selectedVideo.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full"
                            />
                          </div>
                          <h3 className="text-xl font-semibold mt-6 text-center text-white">
                            {selectedVideo.title}
                          </h3>
                          <p className="text-gray-300 mt-3 text-center">
                            {selectedVideo.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl p-6 text-center">
                  <p className="text-gray-300">
                    Select a module to view its content
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
