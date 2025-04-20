'use client'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black/80">
      <Link href="/"><span className="text-2xl font-bold text-purple-400 hover:text-purple-300 cursor-pointer">CourseSite</span></Link>
      <div className="space-x-4">
        {user ? (
          <button onClick={logout} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Logout</button>
        ) : (
          <>  
            <Link href="/login"><button className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">Login</button></Link>
            <Link href="/register"><button className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">Register</button></Link>
          </>
        )}
      </div>
    </nav>
  )
}