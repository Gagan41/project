'use client'

import { useEffect, useState } from "react"
import { getData } from "@/utils/api"

interface Course {
  _id: string
  title: string
  description: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    async function fetchCourses() {
      const data = await getData("/api/courses")
      setCourses(data)
    }
    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course._id} className="p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="mt-2 text-gray-300">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
