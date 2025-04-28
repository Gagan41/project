"use client";
import { useState, useEffect } from "react";
import { getData, postData } from "@/utils/api";
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

  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const data = await getData("/api/courses?populate=modules");
      console.log('Fetched courses:', JSON.stringify(data, null, 2)); // Detailed debug log
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
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
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", res.status, text);
        return;
      }
      await res.json();
      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
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
        { method: "DELETE" }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", res.status, text);
        return;
      }
      await res.json();
      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete module", err);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule || !selectedCourse) return;

    try {
      console.log('Adding video to module:', selectedModule._id);
      const response = await postData(
        `/api/courses/${selectedCourse._id}/modules/${selectedModule._id}/videos`,
        {
          title: videoTitle,
          description: videoDescription,
          youtubeUrl,
        }
      );
      console.log('Video added successfully:', response);
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
        { method: "DELETE" }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", res.status, text);
        return;
      }
      await res.json();
      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete video", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col p-6 text-white gap-8">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">Add New Course</h1>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 focus:outline-purple-400"
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 focus:outline-purple-400"
          required
        />
        <button className="w-full bg-purple-600 py-3 rounded hover:bg-purple-700 transition">
          Save Course
        </button>
      </form>

      <div className="space-y-6 mt-6">
        <h2 className="text-xl font-bold text-center">Existing Courses</h2>
        {courses.length === 0 ? (
          <p className="text-center text-gray-400">No courses found.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">{course.title}</h3>
                  <p className="text-gray-300">{course.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                  >
                    Manage Modules
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {selectedCourse?._id === course._id && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <form onSubmit={handleAddModule} className="space-y-4">
                    <h4 className="text-lg font-semibold">Add New Module</h4>
                    <input
                      type="text"
                      placeholder="Module Title"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      className="w-full p-2 rounded bg-gray-600 focus:outline-purple-400"
                      required
                    />
                    <textarea
                      placeholder="Module Description"
                      value={moduleDescription}
                      onChange={(e) => setModuleDescription(e.target.value)}
                      className="w-full p-2 rounded bg-gray-600 focus:outline-purple-400"
                      required
                    />
                    <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition">
                      Add Module
                    </button>
                  </form>

                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-semibold">Modules</h4>
                    {course.modules?.map((module) => (
                      <div
                        key={module._id}
                        className="bg-gray-600 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold">{module.title}</h5>
                            <p className="text-gray-300">{module.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedModule(module)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                            >
                              Manage Videos
                            </button>
                            <button
                              onClick={() => handleDeleteModule(module._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {selectedModule?._id === module._id && (
                          <div className="mt-4 bg-gray-600 p-4 rounded-lg">
                            <form onSubmit={handleAddVideo} className="space-y-4">
                              <h5 className="font-semibold">Add New Video</h5>
                              <input
                                type="text"
                                placeholder="Video Title"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                className="w-full p-2 rounded bg-gray-500 focus:outline-purple-400"
                                required
                              />
                              <textarea
                                placeholder="Video Description"
                                value={videoDescription}
                                onChange={(e) => setVideoDescription(e.target.value)}
                                className="w-full p-2 rounded bg-gray-500 focus:outline-purple-400"
                                required
                              />
                              <input
                                type="text"
                                placeholder="YouTube URL"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                className="w-full p-2 rounded bg-gray-500 focus:outline-purple-400"
                                required
                              />
                              <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition">
                                Add Video
                              </button>
                            </form>

                            <div className="mt-4 space-y-2">
                              <h5 className="font-semibold">Videos</h5>
                              {module.videos && module.videos.length > 0 ? (
                                module.videos.map((video) => (
                                  <div
                                    key={video._id.toString()}
                                    className="bg-gray-500 p-3 rounded flex justify-between items-center"
                                  >
                                    <div>
                                      <h6 className="font-medium">{video.title}</h6>
                                      <p className="text-white">{video.description}</p>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteVideo(video._id)}
                                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-400 text-center">No videos added yet</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
