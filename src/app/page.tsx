"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CourseBenefitsAndFAQ from "@/components/CourseBenefitsAndFAQ";
import LifeInfo from "@/components/LifeInfo";
import { ArrowRight } from "lucide-react";

interface Course {
  title: string;
  description: string;
  videoUrl: string; // original share URL or plain video id
}

export default function Page() {
  const course: Course = {
    title: "Master communication",
    description:
      "Transform your communication from hesitant to powerful, speak with clarity, confidence and conviction anytime, anywhere",
    videoUrl: "https://youtu.be/ZvUiJjn2QF8", // remove ?si= token for embed
  };

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/#features") {
      const section = document.getElementById("features");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  // Build a safe embed URL on client
  const embedSrc = useMemo(() => {
    // Extract video id from either youtu.be or full YouTube URL
    const url = new URL(course.videoUrl, "https://example.com");
    let id = "";
    if (url.hostname.includes("youtu.be")) {
      id = url.pathname.replace("/", "");
    } else if (url.hostname.includes("youtube.com")) {
      id = url.searchParams.get("v") ?? "";
    } else {
      // fallback: assume already an id
      id = course.videoUrl;
    }
    // Only compose once, and join params with &
    const base = `https://www.youtube.com/embed/${id}`;
    const params = new URLSearchParams({
      // enable JS API only if needed; safe to leave on
      enablejsapi: "1",
      rel: "0",
      modestbranding: "1",
      // use wmode to help stacking context issues
      wmode: "transparent",
      // do not set origin unless on client and known
    });
    if (typeof window !== "undefined" && window.location?.origin) {
      params.set("origin", window.location.origin);
    }
    return `${base}?${params.toString()}`;
  }, [course.videoUrl]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 scroll-smooth relative">
      {/* Hero Section */}
      <section className="relative h-auto flex flex-col items-start justify-start px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto text-center w-full max-w-4xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-2 sm:px-0"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-balance mt-7">
              <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent block">
                Master
              </span>
              <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent block">
                communication
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 sm:mt-6 text-gray-300"
          >
            <p className="text-sm sm:text-xl md:text-2xl mt-5 leading-relaxed text-balance">
              <strong className="font-semibold text-gray-200">
                speak with clarity
              </strong>
              ,{" "}
              <strong className="font-semibold text-gray-200">
                confidence and conviction
              </strong>{" "}
              <span className="text-gray-400">anytime, anywhere.</span>
            </p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-xl md:text-2xlmb-5 leading-relaxed text-balance">
              It&apos;s a skill that will be taught step-by-step
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="
        relative
        aspect-video
        w-full
        max-w-sm
        sm:max-w-3xl
        md:max-w-4xl
        mx-auto
        mt-5 sm:mt-8
        rounded-2xl
        overflow-hidden
        border border-gray-800
        shadow-2xl shadow-gray-900/50
      "
          >
            <iframe
              className="w-full h-full"
              src={embedSrc}
              title="Intro Video"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-5 sm:mt-8"
          >
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-xl font-semibold text-black bg-yellow-400 rounded-xl overflow-hidden transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-900/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join now!
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16 relative">
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
              The traditional education system never taught how to truly express
              yourself — and that changes here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative p-10 rounded-2xl bg-gray-900/40 backdrop-blur-sm border border-gray-800"
          >
            <div className="space-y-10">
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
