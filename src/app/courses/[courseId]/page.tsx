"use client";
import { useState, useEffect } from "react";
import { getData } from "@/utils/api";
import { useParams, useRouter } from 'next/navigation';

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
  const params = useParams(); // ⬅️ NEW
  const courseId = params?.courseId as string; // ⬅️ NEW
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
  }, [courseId, router]); // ✅ Clean dependency

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/courses")}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-300 mb-8">{course.description}</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with modules */}
          <div className="w-full lg:w-1/4 bg-gray-800 rounded-lg p-4 h-[calc(100vh-200px)] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-800 py-2">Modules</h2>
            <div className="space-y-2">
              {course.modules?.map((module) => (
                <button
                  key={module._id}
                  onClick={() => {
                    setSelectedModule(module);
                    if (module.videos?.length > 0) {
                      setSelectedVideo(module.videos[0]);
                    } else {
                      setSelectedVideo(null);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedModule?._id === module._id
                      ? "bg-purple-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{module.title}</h3>
                    <span className="text-sm text-gray-300">
                      {module.videos?.length || 0} videos
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{module.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {selectedModule ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedModule.title}
                </h2>
                <p className="text-gray-300 mb-6">{selectedModule.description}</p>

                {/* Video list */}
                <div className="space-y-4 mb-8">
                  {selectedModule.videos?.map((video) => (
                    <div
                      key={video._id}
                      className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition ${
                        selectedVideo?._id === video._id
                          ? "ring-2 ring-purple-500"
                          : "hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <h3 className="font-medium">{video.title}</h3>
                      <p className="text-gray-300">{video.description}</p>
                    </div>
                  ))}
                </div>

                {/* Video player */}
                {selectedVideo && (
                  <div className="mt-8">
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractVideoId(selectedVideo.youtubeUrl)}`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mt-4">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{selectedVideo.description}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p>Select a module to view its content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
