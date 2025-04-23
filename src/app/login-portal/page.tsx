'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPortal() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      {/* Matrix background pattern */}
      <div className="absolute inset-0 z-0 bg-[url('/matrix.gif')] bg-cover bg-center opacity-40" />

      {/* Content Container */}
      <div className="relative z-10 bg-gradient-to-br from-purple-800/30 to-black/50 backdrop-blur-lg border border-purple-600/20 shadow-[0_0_40px_#a855f7aa] rounded-2xl p-6 sm:p-8 md:p-14 max-w-xl w-full text-center space-y-6 text-white transition-all duration-300">
        
        {/* Logo */}
        <Image
          src="/img.jpg"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto rounded-full drop-shadow-[0_0_10px_#a855f7]"
        />

        {/* Back Arrow */}
        <button
          onClick={() => router.push('/')}
          className="text-4xl sm:text-5xl hover:text-purple-300 transition duration-200"
        >
          ⇚
        </button>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-purple-300 drop-shadow-md">
          The Communication Mastery Portal
        </h1>

        <p className="text-base sm:text-lg text-gray-200 px-2">
          Login to <span className="font-semibold text-white">Communication Mastery</span> — your gateway to eloquence and influence.
        </p>

        <p className="text-sm text-purple-100 italic">
          Stop being misunderstood. Start <span className="font-bold text-white">speaking with clarity</span>.
        </p>

        {/* Register link + Login button */}
        <div className="flex flex-col items-center space-y-4 w-full">
          <Link
            href="/register"
            className="text-sm px-4 py-2 border border-purple-300 rounded-full text-purple-300 hover:bg-purple-300 hover:text-black transition"
          >
            I don't have an account
          </Link>

          <button
            onClick={() => router.push('/login')}
            className="w-full sm:w-auto px-8 py-3 bg-purple-500 hover:bg-purple-600 text-black font-bold text-md rounded-full shadow-md hover:shadow-purple-600/50 transition"
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  )
}
