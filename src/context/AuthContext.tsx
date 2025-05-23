"use client";

import { createContext, useState, useEffect } from "react";
import { getData } from "@/utils/api";
import Cookies from "js-cookie";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login(token: string): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) login(t);
  }, []);

  async function login(t: string) {
    // Store token in both localStorage and cookies
    localStorage.setItem("token", t);
    Cookies.set("token", t, {
      expires: 7, // 7 days
      path: "/",
      sameSite: "strict",
    });

    setToken(t);
    try {
      const data = await getData("/api/user/profile", t);
      setUser({ name: data.name, email: data.email, role: data.role });
    } catch {
      setUser(null);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    Cookies.remove("token", { path: "/" });
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
