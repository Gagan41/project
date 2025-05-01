'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AuthContext } from '../../context/AuthContext'
import { postData } from '../../utils/api'
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { token } = await postData('/api/auth/login', { email, password })

      if (!token) {
        toast.error('Invalid credentials. Please try again.')
        return
      }

      login(token)
      router.push('/course-info')
    } catch (error) {
      toast.error('Invalid email or password. Please try again.')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 text-white overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast UI */}

      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-sm text-purple-400 hover:text-white transition"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-center">Login to Your Account</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-800 text-gray-100 focus:outline-purple-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-purple-400 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
