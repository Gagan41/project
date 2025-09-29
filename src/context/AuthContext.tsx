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
  login: (token: string) => Promise<void>;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken =
          localStorage.getItem("token") || Cookies.get("token");

        if (storedToken) {
          localStorage.setItem("token", storedToken);
          Cookies.set("token", storedToken, {
            expires: 7,
            path: "/",
            sameSite: "strict",
          });

          // ✅ Tell getData what to expect
          const data = await getData<User>("/api/user/profile", storedToken);

          setUser({
            name: data.name,
            email: data.email,
            role: data.role,
          });
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("token");
        Cookies.remove("token", { path: "/" });
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  async function login(t: string) {
    try {
      localStorage.setItem("token", t);
      Cookies.set("token", t, {
        expires: 7,
        path: "/",
        sameSite: "strict",
      });

      // ✅ Type the response here too
      const data = await getData<User>("/api/user/profile", t);

      setUser({
        name: data.name,
        email: data.email,
        role: data.role,
      });
      setToken(t);
    } catch (error) {
      console.error("Login error:", error);
      localStorage.removeItem("token");
      Cookies.remove("token", { path: "/" });
      setUser(null);
      setToken(null);
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    Cookies.remove("token", { path: "/" });
    setToken(null);
    setUser(null);
  }

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
