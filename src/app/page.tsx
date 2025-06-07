"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CourseBenefitsAndFAQ from "@/components/CourseBenefitsAndFAQ";
import LifeInfo from "@/components/LifeInfo";
import { ArrowRight, Play } from "lucide-react";

interface Course {
  title: string;
  description: string;
  videoUrl: string;
}

export default function Page() {
  const course: Course = {
    title: "Mastering Communication",
    description: "Learn to communicate like a pro in every situation.",
    videoUrl: "https://youtu.be/PGrtFamXEa4?si=OQbKMt3dwuKDLOkx",
  };

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/#features") {
      const section = document.getElementById("features");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 scroll-smooth relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-balance">
              <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                {course.title}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto text-balance">
              {course.description}
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-gray-900/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-gray-900/10" />
            <iframe
              className="w-full h-full"
              src={`${course.videoUrl.replace(
                "youtu.be/",
                "www.youtube.com/embed/"
              )}?modestbranding=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.origin : ""
              )}`}
              title="Intro Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => {
              window.location.href = "/login";
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg sm:text-xl font-semibold text-black bg-white rounded-xl overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join now!
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              A MASSIVE UPGRADE
            </h2>
            <p className="text-xl text-gray-400">
              The traditional education system never taught you how to truly
              express yourself.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800"
          >
            <div className="space-y-8">
              {/* First Paragraph with Animated Elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full" />
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed text-balance pl-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="inline-block"
                  >
                    <strong className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                      Imagine mastering the art of communication —
                    </strong>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="inline-block mt-2"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 font-bold">
                      the skill that opens every door
                    </span>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="inline-block mt-2"
                  >
                    <strong className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                      Gain insights directly from elite communicators who'll
                      guide you step-by-step.
                    </strong>
                  </motion.span>
                </p>
              </motion.div>

              {/* Second Paragraph with Highlight Effect */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-xl sm:text-2xl text-gray-300 text-balance pl-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="inline-block"
                  >
                    That's{" "}
                    <strong className="relative">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                        exactly
                      </span>
                      <span className="absolute inset-0 bg-gray-700/20 blur-sm transform scale-110" />
                    </strong>{" "}
                    what you'll unlock inside{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                        COMMUNICATION MASTERY
                      </span>
                      <span className="absolute inset-0 bg-gray-700/20 blur-sm transform scale-110" />
                    </span>
                    .
                  </motion.span>
                </p>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-700/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* LifeInfo Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent" />
        <div className="relative">
          <LifeInfo />
        </div>
      </div>

      {/* Course Benefits and FAQ Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent" />
        <div className="relative">
          <CourseBenefitsAndFAQ />
        </div>
      </div>
    </main>
  );
}
