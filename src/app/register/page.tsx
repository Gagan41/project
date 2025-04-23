'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import { postData } from '../../utils/api'
import { ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login } = useContext(AuthContext)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError("Passwords don't match.")
      return
    }
    try {
      const { token } = await postData('/api/auth/register', { name, email, password })
      login(token)
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center px-4 text-white overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-sm text-purple-400 hover:text-white transition"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-gray-100 focus:outline-purple-400"
          />

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded transition text-white font-semibold"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
