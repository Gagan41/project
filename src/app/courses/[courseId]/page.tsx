"use client";
import { useState, useEffect } from "react";
import { getData } from "@/utils/api";
import { useRouter } from "next/navigation";

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

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getData(`/api/courses/${params.courseId}`);
        setCourse(data);
        if (data.modules?.length > 0) {
          setSelectedModule(data.modules[0]);
        }
      } catch (err) {
        console.error("Failed to fetch course", err);
        router.push("/courses");
      }
    };

    fetchCourse();
  }, [params.courseId, router]);

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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with modules */}
          <div className="w-full md:w-1/4 bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Modules</h2>
            <div className="space-y-2">
              {course.modules?.map((module) => (
                <button
                  key={module._id}
                  onClick={() => setSelectedModule(module)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedModule?._id === module._id
                      ? "bg-purple-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <h3 className="font-medium">{module.title}</h3>
                  <p className="text-sm text-gray-300">{module.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-3/4">
            {selectedModule ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedModule.title}
                </h2>
                <p className="text-gray-300 mb-6">{selectedModule.description}</p>

                {/* Video list */}
                <div className="space-y-4">
                  {selectedModule.videos?.map((video) => (
                    <div
                      key={video._id}
                      className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition"
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
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${
                          selectedVideo.youtubeUrl.split("v=")[1]
                        }`}
                        title={selectedVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
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