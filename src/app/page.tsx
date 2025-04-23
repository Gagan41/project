'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface Course {
  title: string
  description: string
  videoUrl: string
}

export default function Page() {
  const course: Course = {
    title: 'Mastering Communication',
    description: 'Learn to communicate like a pro in every situation.',
    videoUrl: 'https://youtu.be/PGrtFamXEa4?si=OQbKMt3dwuKDLOkx',
  }

  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/#features") {
      const section = document.getElementById("features")
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [pathname])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-4 sm:px-6 py-12 scroll-smooth">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-400 leading-tight text-balance">
          {course.title}
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto text-balance">
          {course.description}
        </p>

        {/* Video */}
        <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <iframe
            className="w-full h-full"
            src={course.videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')}
            title="Intro Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            window.location.href = '/login'
          }}
          className="mt-8 px-8 py-4 text-lg sm:text-xl bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition shadow-md hover:shadow-lg"
        >
          Join now!
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-5xl mx-auto mt-24 text-center space-y-6 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">A MASSIVE UPGRADE</h2>
        <p className="text-gray-300 text-base sm:text-lg">
          The traditional education system never taught you how to truly express yourself.
        </p>

        <p className="text-gray-200 font-semibold text-lg sm:text-xl leading-relaxed text-balance">
          <strong>Imagine mastering the art of communication —</strong>
          <span className="text-purple-400 font-bold"> the skill that opens every door</span>
          <strong>. Gain insights directly from elite speakers, coaches, and communicators who’ll guide you step-by-step.</strong>
        </p>

        <p className="text-lg sm:text-xl text-white text-balance">
          That’s <strong className="text-purple-400">exactly</strong> what you’ll unlock inside{' '}
          <span className="font-bold">COMMUNICATION MASTERY.</span>
        </p>
      </section>
    </main>
  )
}
