'use client'
import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../context/AuthContext'
import { postData } from '../../utils/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { token } = await postData('/api/auth/login', { email, password })
    login(token)
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
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
      <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded transition">
        Login
      </button>
    </form>
  )
}