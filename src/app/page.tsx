'use client'

import { useState } from 'react'
import VideoModal from '../components/VideoModal'

interface Course {
  title: string
  description: string
  videoUrl: string
}

export default function Home() {
  const [open, setOpen] = useState(false)
  const course: Course = {
    title: 'Mastering Communication',
    description: 'Learn to communicate like a pro in every situation.',
    videoUrl: 'https://youtu.be/nxK_TCt2pKw',
  }

  return (
    <div className="text-center space-y-6">
      <h1 className="text-5xl font-extrabold text-purple-400">{course.title}</h1>
      <p className="max-w-xl mx-auto text-gray-300">{course.description}</p>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
      >
        Watch Intro Video
      </button>
      <VideoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        videoUrl={course.videoUrl}
      />
    </div>
  )
}
