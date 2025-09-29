"use client";
import { useState, useEffect } from "react";
import { getData, postData } from "@/utils/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Video,
  BookOpen,
  Loader2,
  ArrowLeft,
} from "lucide-react";

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

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const data = await getData("/api/courses?populate=modules");

      if (!data) {
        console.warn("No courses data received");
        setCourses([]);
        return;
      }

      if (!Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        setCourses([]);
        return;
      }

      const validCourses = data.filter((course) => {
        const isValid = course && typeof course === "object" && "_id" in course;
        if (!isValid) {
          console.warn("Invalid course data:", course);
        }
        return isValid;
      });

      setCourses(validCourses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postData("/api/courses", { title, description });
      setTitle("");
      setDescription("");
      await fetchCourses();
    } catch (err) {
      console.error("Failed to create course", err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", res.status, data);
        return;
      }

      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    try {
      await postData(`/api/courses/${selectedCourse._id}/modules`, {
        title: moduleTitle,
        description: moduleDescription,
      });
      setModuleTitle("");
      setModuleDescription("");
      await fetchCourses();
    } catch (err) {
      console.error("Failed to add module", err);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!selectedCourse) return;

    try {
      const res = await fetch(
        `/api/courses/${selectedCourse._id}/modules/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", res.status, data);
        return;
      }

      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule || !selectedCourse) return;

    try {
      const response = await postData(
        `/api/courses/${selectedCourse._id}/modules/${selectedModule._id}/videos`,
        {
          title: videoTitle,
          description: videoDescription,
          youtubeUrl,
        }
      );

      console.log("Video added:", response);
      setVideoTitle("");
      setVideoDescription("");
      setYoutubeUrl("");
      await fetchCourses();
    } catch (err) {
      console.error("Failed to add video", err);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (!selectedModule || !selectedCourse) return;

    try {
      const res = await fetch(
        `/api/courses/${selectedCourse._id}/modules/${selectedModule._id}/videos/${videoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", res.status, data);
        return;
      }

      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete video:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold text-white mb-8">
            Course Management Dashboard
          </h1>

          <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-white">
                Add New Course
              </h2>
              <input
                type="text"
                placeholder="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                required
              />
              <textarea
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                required
              />
              <button className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 w-full flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Save Course
              </button>
            </form>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Existing Courses
          </h2>
          {courses.length === 0 ? (
            <p className="text-center text-gray-400">No courses found.</p>
          ) : (
            courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl p-6"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-300">{course.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Manage Modules
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                {selectedCourse?._id === course._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="bg-gray-800/50 rounded-xl p-6">
                      <form onSubmit={handleAddModule} className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">
                          Add New Module
                        </h4>
                        <input
                          type="text"
                          placeholder="Module Title"
                          value={moduleTitle}
                          onChange={(e) => setModuleTitle(e.target.value)}
                          className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                          required
                        />
                        <textarea
                          placeholder="Module Description"
                          value={moduleDescription}
                          onChange={(e) => setModuleDescription(e.target.value)}
                          className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                          required
                        />
                        <button className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 w-full flex items-center justify-center gap-2">
                          <Plus className="w-5 h-5" />
                          Add Module
                        </button>
                      </form>

                      <div className="mt-8 space-y-4">
                        <h4 className="text-lg font-semibold text-white">
                          Modules
                        </h4>
                        {course.modules?.map((module, moduleIndex) => (
                          <motion.div
                            key={module._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: moduleIndex * 0.1,
                              duration: 0.5,
                            }}
                            className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl p-4"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-grow">
                                <h5 className="font-semibold text-white">
                                  {module.title}
                                </h5>
                                <p className="text-gray-300">
                                  {module.description}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setSelectedModule(module)}
                                  className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 flex items-center gap-2"
                                >
                                  <Video className="w-4 h-4" />
                                  Manage Videos
                                </button>
                                <button
                                  onClick={() => handleDeleteModule(module._id)}
                                  className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>

                            {selectedModule?._id === module._id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                                className="mt-4"
                              >
                                <div className="bg-gray-800/50 rounded-xl p-4">
                                  <form
                                    onSubmit={handleAddVideo}
                                    className="space-y-4"
                                  >
                                    <h5 className="font-semibold text-white">
                                      Add New Video
                                    </h5>
                                    <input
                                      type="text"
                                      placeholder="Video Title"
                                      value={videoTitle}
                                      onChange={(e) =>
                                        setVideoTitle(e.target.value)
                                      }
                                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                                      required
                                    />
                                    <textarea
                                      placeholder="Video Description"
                                      value={videoDescription}
                                      onChange={(e) =>
                                        setVideoDescription(e.target.value)
                                      }
                                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                                      required
                                    />
                                    <input
                                      type="text"
                                      placeholder="YouTube URL"
                                      value={youtubeUrl}
                                      onChange={(e) =>
                                        setYoutubeUrl(e.target.value)
                                      }
                                      className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                                      required
                                    />
                                    <button className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 w-full flex items-center justify-center gap-2">
                                      <Plus className="w-5 h-5" />
                                      Add Video
                                    </button>
                                  </form>

                                  <div className="mt-6 space-y-3">
                                    <h5 className="font-semibold text-white">
                                      Videos
                                    </h5>
                                    {module.videos &&
                                    module.videos.length > 0 ? (
                                      module.videos.map((video, videoIndex) => (
                                        <motion.div
                                          key={video._id.toString()}
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{
                                            delay: videoIndex * 0.1,
                                            duration: 0.5,
                                          }}
                                          className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl p-4"
                                        >
                                          <div className="flex justify-between items-start gap-4">
                                            <div className="flex-grow">
                                              <h6 className="font-medium text-white">
                                                {video.title}
                                              </h6>
                                              <p className="text-gray-300">
                                                {video.description}
                                              </p>
                                            </div>
                                            <button
                                              onClick={() =>
                                                handleDeleteVideo(video._id)
                                              }
                                              className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 flex items-center gap-2"
                                            >
                                              <Trash2 className="w-4 h-4" />
                                              Delete
                                            </button>
                                          </div>
                                        </motion.div>
                                      ))
                                    ) : (
                                      <p className="text-gray-400 text-center">
                                        No videos added yet
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
