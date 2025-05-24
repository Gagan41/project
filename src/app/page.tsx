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
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-gray-100 scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_50%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-balance">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {course.title}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto text-balance">
              {course.description}
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
            <iframe
              className="w-full h-full"
              src={course.videoUrl.replace(
                "youtu.be/",
                "www.youtube.com/embed/"
              )}
              title="Intro Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
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
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join now!
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              A MASSIVE UPGRADE
            </h2>
            <p className="text-xl text-gray-300">
              The traditional education system never taught you how to truly
              express yourself.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-purple-500/20"
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
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed text-balance pl-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="inline-block"
                  >
                    <strong className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
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
                    <strong className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Gain insights directly from elite communicators who'll guide you step-by-step.
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
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-xl sm:text-2xl text-white text-balance pl-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="inline-block"
                  >
                    That's{" "}
                    <strong className="relative">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        exactly
                      </span>
                      <span className="absolute inset-0 bg-purple-500/20 blur-sm transform scale-110" />
                    </strong>{" "}
                    what you'll unlock inside{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        COMMUNICATION MASTERY
                      </span>
                      <span className="absolute inset-0 bg-purple-500/20 blur-sm transform scale-110" />
                    </span>
                    .
                  </motion.span>
                </p>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* LifeInfo Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
        <div className="relative">
          <LifeInfo />
        </div>
      </div>

      {/* Course Benefits and FAQ Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
        <div className="relative">
          <CourseBenefitsAndFAQ />
        </div>
      </div>
    </main>
  );
}