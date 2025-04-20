'use client'
import { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

interface AuthContextType {
  user: any
  login(token: string): void
  logout(): void
}

export const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) setUser(jwtDecode(t))
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setUser(jwtDecode(token))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}