"use client";
import { useState, useEffect } from "react";
import { getData, postData } from "@/utils/api";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  const router = useRouter();

  // Extracted fetchCourses so we can call it on mount and after add/delete
  const fetchCourses = async () => {
    try {
      const data = await getData("/api/courses");
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
    await postData("/api/courses", { title, description });
    setTitle("");
    setDescription("");
    // Re-fetch the updated list
    await fetchCourses();
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });

      // If the API route isn't found, Next.js will return HTML 404
      if (!res.ok) {
        const text = await res.text(); // read raw body
        console.error("Delete failed:", res.status, text);
        return;
      }

      // Successfully deleted
      await res.json();
      // Re-fetch the updated list
      await fetchCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
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
              className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center transition hover:shadow-purple-600/50"
            >
              <div>
                <h3 className="text-lg font-semibold text-purple-300">{course.title}</h3>
                <p className="text-gray-300">{course.description}</p>
              </div>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
