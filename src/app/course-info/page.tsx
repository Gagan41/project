"use client";
import { useRouter } from "next/navigation";

export default function CourseInfoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <span className="text-xl">←</span>
          <span className="text-lg">Back to Home</span>
        </button>

        <h1 className="text-4xl font-bold mb-6 text-purple-400">
          Mastering Communication & English Fluency
        </h1>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          This course is designed to transform your English speaking abilities,
          boost your confidence, and sharpen your communication skills — whether
          you're preparing for a job interview, aiming to ace public speaking,
          or simply want to speak English with fluency and finesse.
        </p>

        <h2 className="text-2xl font-semibold text-purple-300 mb-4">
          What You'll Learn:
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-200">
          <li>
            Build fluency through real-life conversations and speaking drills
          </li>
          <li>Master body language, tone, and professional etiquette</li>
          <li>Eliminate hesitation and nervousness while speaking</li>
          <li>Improve pronunciation and vocabulary usage</li>
          <li>Write and deliver impactful speeches and presentations</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">
          Who Is This Course For?
        </h2>
        <p className="text-gray-300 leading-relaxed">
          If you're a student, job seeker, entrepreneur, or anyone looking to
          enhance your communication skills and express yourself confidently in
          English — this course is for you!
        </p>

        <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4">
          Duration & Format
        </h2>
        <p className="text-gray-300 leading-relaxed">
          📅 6 Weeks | 🎥 Video Modules | 📝 Practical Assignments | 🎤 Live
          Sessions
        </p>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/courses")}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg text-white text-lg font-semibold"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
}
