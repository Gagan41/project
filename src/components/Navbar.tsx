"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md px-6 py-4 text-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold text-purple-400 hover:text-purple-300 cursor-pointer">
              CourseSite
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={scrollToFeatures}
              className="font-semibold text-white hover:text-purple-300 transition"
            >
              Features
            </button>
            <button className="font-semibold text-white hover:text-purple-300 transition">
              Interviews
            </button>
            <button className="font-semibold text-white hover:text-purple-300 transition">
              Student Wins
            </button>

            {/* Conditionally render Courses only if user is logged in */}
            {user && (
              <Link href="/course-info">
                <button className="font-semibold text-white hover:text-purple-300 transition">
                  Courses
                </button>
              </Link>
            )}

            <button className="font-semibold text-white hover:text-purple-300 transition">
              About Us
            </button>

            {user?.role === "admin" && (
              <Link href="/admin/dashboard">
                <button className="font-semibold text-purple-400 hover:text-white transition">
                  Admin Dashboard
                </button>
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/profile">
                  <button className="p-2 rounded hover:bg-gray-700 transition">
                    <User className="w-6 h-6 text-purple-300" />
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded border border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login-portal">
                  <button className="px-4 py-2 rounded border border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white transition">
                    Log in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition">
                    Join Now
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer + Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-full bg-gray-900 z-50 p-6 flex flex-col items-center gap-6 shadow-lg rounded-b-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={scrollToFeatures}
                className="text-center font-semibold text-purple-400 hover:text-white transition"
              >
                Features
              </button>
              <button className="text-center font-semibold text-white hover:text-purple-300 transition">
                Interviews
              </button>
              <button className="text-center font-semibold text-white hover:text-purple-300 transition">
                Student Wins
              </button>

              {/* Conditionally render Courses only if user is logged in */}
              {user && (
                <Link href="/course-info">
                  <button className="text-center font-semibold text-white hover:text-purple-300 transition">
                    Courses
                  </button>
                </Link>
              )}

              <button className="text-center font-semibold text-white hover:text-purple-300 transition">
                About Us
              </button>

              {user?.role === "admin" && (
                <Link href="/admin/dashboard">
                  <button className="text-center font-semibold text-purple-400 hover:text-white transition">
                    Admin Dashboard
                  </button>
                </Link>
              )}

              {user ? (
                <>
                  <Link href="/profile">
                    <button className="p-2 rounded hover:bg-gray-700 transition">
                      <User className="w-6 h-6 text-purple-300" />
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="mt-4 px-6 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 w-full items-center">
                  <Link href="/login-portal">
                    <button className="px-25 py-2 rounded border border-purple-400 font-semibold text-purple-400 hover:bg-purple-600 hover:text-white transition">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="px-25 py-2 bg-purple-600 rounded hover:bg-purple-700 transition">
                      Join Now
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
