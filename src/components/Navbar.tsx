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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/80 via-gray-900/20 to-black/80 backdrop-blur-2xl border-b border-gray-800 px-6 py-4 text-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold relative group cursor-pointer">
              <span className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 group-hover:from-gray-100 group-hover:to-gray-300 transition duration-300">
                CourseSite
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={scrollToFeatures}
              className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group"
            >
              <span className="relative z-10">Features</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
              <span className="relative z-10">Interviews</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
              <span className="relative z-10">Student Wins</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
            </button>

            {/* Conditionally render Courses only if user is logged in */}
            {user && (
              <Link href="/course-info" prefetch={false}>
                <button className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
                  <span className="relative z-10">Courses</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </Link>
            )}

            <button className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
            </button>

            {user?.role === "admin" && (
              <Link href="/admin/dashboard">
                <button className="relative font-medium text-gray-400 hover:text-white transition-all duration-300 group">
                  <span className="relative z-10">Admin Dashboard</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </button>
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/profile">
                  <button className="p-2 rounded-full hover:bg-gray-800/20 transition-all duration-300 group">
                    <User className="w-6 h-6 text-gray-400 group-hover:text-white" />
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login-portal">
                  <button className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
                    Log in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
                    Join Now
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-800/20 transition-all duration-300 group"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-400 group-hover:text-white" />
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
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-full max-w-sm bg-gradient-to-b from-black/95 to-gray-900/20 backdrop-blur-2xl z-50 p-6 flex flex-col items-center gap-6 shadow-2xl border-l border-gray-800"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-800/20 transition-all duration-300 group"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
              </button>

              <button
                onClick={scrollToFeatures}
                className="w-full text-center font-medium text-gray-400 hover:text-white transition-all duration-300 group"
              >
                <span className="relative z-10">Features</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="w-full text-center font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
                <span className="relative z-10">Interviews</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Conditionally render Courses only if user is logged in */}
              {user && (
                <Link href="/course-info" prefetch={false}>
                  <button className="w-full text-center font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
                    <span className="relative z-10">Courses</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </Link>
              )}

              <button className="w-full text-center font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
                <span className="relative z-10">About Us</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
              </button>

              {user?.role === "admin" && (
                <Link href="/admin/dashboard">
                  <button className="w-full text-center font-medium text-gray-400 hover:text-white transition-all duration-300 group">
                    <span className="relative z-10">Admin Dashboard</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </button>
                </Link>
              )}

              {/* Mobile Menu Buttons */}
              {user ? (
                <>
                  <Link href="/profile">
                    <button className="p-2 rounded-full hover:bg-gray-800/20 transition-all duration-300 group">
                      <User className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 w-full items-center">
                  <Link href="/login-portal">
                    <button className="w-full group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="w-full group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
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
