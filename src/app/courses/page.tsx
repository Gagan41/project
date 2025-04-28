'use client'

import { useEffect, useState } from "react"
import { getData } from "@/utils/api"
import Link from "next/link"

interface Course {
  _id: string
  title: string
  description: string
  modules: Module[]
}

interface Module {
  _id: string
  title: string
  description: string
  videos: Video[]
}

interface Video {
  _id: string
  title: string
  description: string
  youtubeUrl: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getData("/api/courses")
        setCourses(data)
      } catch (err) {
        console.error("Failed to fetch courses", err)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course._id}
              href={`/courses/${course._id}`}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{course.modules?.length || 0} Modules</span>
                <span>
                  {course.modules?.reduce(
                    (acc, module) => acc + (module.videos?.length || 0),
                    0
                  )}{" "}
                  Videos
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
