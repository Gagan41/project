"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

  const scrollToAbout = () => {
    const section = document.getElementById("about");
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
            <span className="relative inline-flex items-end cursor-pointer">
              <Image
                src="/logo.png"
                alt="Bold Voice Systems Logo"
                width={100}
                height={35}
                className="object-contain"
                priority
              />
              <span className="ml-1 text-xs font-sm text-white">
                Community
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

            {user && (
              <Link href="/course-info" prefetch={false}>
                <button className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
                  <span className="relative z-10">Courses</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
                </button>
              </Link>
            )}

            <button
              onClick={scrollToAbout}
              className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group"
            >
              <span className="relative z-10">About</span>
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

            {/* ✅ Help Dropdown */}
            <div className="relative group">
              <button className="relative font-medium text-gray-300 hover:text-gray-100 transition-all duration-300 group">
                <span className="relative z-10">Help</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-48 bg-black/95 border border-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-300">
                <Link
                  href="/terms"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-t-lg"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/refund"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Refund Policy
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-b-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
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
                  className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login-portal">
                  <button className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
                    Log in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
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

              {/* ✅ Mobile Nav Links (All Unified) */}
              <div className="flex flex-col space-y-5 mt-6 w-full text-center text-white">
                <button
                  onClick={scrollToFeatures}
                  className="relative w-full text-center font-medium hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">Features</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                </button>

                {user && (
                  <Link
                    href="/course-info"
                    prefetch={false}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative inline-block w-full text-center font-medium hover:text-white transition-all duration-300 group">
                      <span className="relative z-10">Courses</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                    </span>
                  </Link>
                )}

                <button
                  onClick={scrollToAbout}
                  className="relative w-full text-center font-medium hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">About</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                </button>

                {user?.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative inline-block w-full text-center font-medium hover:text-white transition-all duration-300 group">
                      <span className="relative z-10">Admin Dashboard</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                    </span>
                  </Link>
                )}

                {/* ✅ Unified Quick Links */}
                <Link href="/terms" onClick={() => setIsMenuOpen(false)}>
                  <span className="relative inline-block w-full text-center font-medium hover:text-white transition-all duration-300 group">
                    <span className="relative z-10">Terms of Service</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                  </span>
                </Link>

                <Link href="/privacy" onClick={() => setIsMenuOpen(false)}>
                  <span className="relative inline-block w-full text-center font-medium hover:text-white transition-all duration-300 group">
                    <span className="relative z-10">Privacy Policy</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                  </span>
                </Link>

                <Link href="/refund" onClick={() => setIsMenuOpen(false)}>
                  <span className="relative inline-block w-full text-center font-medium hover:text-white transition-all duration-300 group">
                    <span className="relative z-10">Refund Policy</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                  </span>
                </Link>

                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <span className="relative inline-block w-full text-center font-medium hover:text-white transition-all duration-300 group">
                    <span className="relative z-10">Contact Us</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-1/2 transition-all duration-300"></span>
                  </span>
                </Link>
              </div>

              {/* Mobile Auth Buttons */}
              {user ? (
                <>
                  <Link href="/profile">
                    <button className="p-2 rounded-full hover:bg-gray-800/20 transition-all duration-300 group">
                      <User className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 w-full items-center">
                  <Link href="/login-portal">
                    <button className="w-full group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="w-full group relative inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-black bg-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25">
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
