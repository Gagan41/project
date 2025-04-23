'use client'

import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  name?: string
  email?: string
  exp?: number
}

interface AuthContextType {
  user: DecodedToken | null
  token: string | null
  login(token: string): void
  logout(): void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) {
      try {
        const decoded = jwtDecode<DecodedToken>(t)
        setToken(t)
        setUser(decoded)
      } catch (error) {
        console.error('Token decode failed:', error)
        localStorage.removeItem('token')
      }
    }
  }, [])

  const login = (t: string) => {
    localStorage.setItem('token', t)
    setToken(t)
    setUser(jwtDecode<DecodedToken>(t))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
