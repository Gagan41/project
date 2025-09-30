"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CourseBenefitsAndFAQ from "@/components/CourseBenefitsAndFAQ";
import LifeInfo from "@/components/LifeInfo";
import { ArrowRight } from "lucide-react";

interface Course {
  title: string;
  description: string;
  videoUrl: string;
}

export default function Page() {
  const course: Course = {
    title: "Master communication",
    description:
      "Transform you communication from hesitant to powerful , speak with clarlity , confidence and conviction anytime , anywhere",
    videoUrl: "https://youtu.be/ZvUiJjn2QF8?si=rZUtYg94x0375pIk",
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

            <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">
              <strong className="font-semibold text-gray-200">
                speak with clarity
              </strong>
              ,{" "}
              <strong className="font-semibold text-gray-200">
                confidence and conviction
              </strong>{" "}
              anytime, anywhere.
            </p>

            <p className="font-semibold text-white text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance">It&apos;s a skill that I will teach you how to master it </p>
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
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg sm:text-xl font-semibold text-black bg-yellow-400 rounded-xl overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
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
        <div className="max-w-5xl mx-auto space-y-16 relative">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Why this matters
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The traditional education system never taught you how to truly
              express yourself — and that changes here.
            </p>
          </motion.div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative p-10 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800"
          >
            <div className="space-y-10">
              {/* First Paragraph */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full" />
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed pl-6 space-y-4">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="block"
                  >
                    <strong className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                      Imagine mastering the art of communication —
                    </strong>{" "}
                    your voice shapes how the world sees you.
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="block"
                  >
                    When it lacks clarity or confidence,{" "}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                      even great ideas can be ignored.
                    </span>
                  </motion.span>

                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="block"
                  >
                    But when you speak with{" "}
                    <strong className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                      strength and presence
                    </strong>
                    , people listen, respect follows, and opportunities open.
                  </motion.span>
                </p>
              </motion.div>

              {/* Second Paragraph */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="relative group"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-xl sm:text-2xl text-gray-300 pl-6 leading-relaxed">
                  That’s{" "}
                  <strong className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                      exactly
                    </span>
                    <span className="absolute inset-0 bg-gray-700/20 blur-sm scale-110" />
                  </strong>{" "}
                  what you’ll unlock inside{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                      Bold Voice Systems
                    </span>
                    <span className="absolute inset-0 bg-gray-700/20 blur-sm scale-110" />
                  </span>
                  .
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
