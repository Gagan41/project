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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await getData("/api/courses?populate=modules")
        
        if (!data) {
          setError("No courses found")
          return
        }

        // Ensure we have an array of courses
        if (!Array.isArray(data)) {
          setError("Invalid course data format")
          return
        }

        setCourses(data)
      } catch (err) {
        console.error("Failed to fetch courses:", err)
        setError("Failed to load courses. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const getTotalVideos = (course: Course) => {
    return course.modules?.reduce((total, module) => {
      return total + (module.videos?.length || 0)
    }, 0) || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading courses...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course._id}
              href={`/courses/${course._id}`}
              className="block"
            >
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition cursor-pointer h-full">
                <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{course.modules?.length || 0} modules</span>
                  <span>{getTotalVideos(course)} videos</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
