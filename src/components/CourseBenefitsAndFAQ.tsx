"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    question: "Who is this course for?",
    answer:
      " Anyone ready to speak clearly, confidently, and persuasively—students, professionals, entrepreneurs, or anyone looking to improve communication",
  },
  {
    question: "Do I need prior experience in public speaking?",
    answer:
      "No. The course is beginner-friendly and guides you step by step to build confidence and clarity.",
  },
  {
    question: "Will this help with my accent or fluency?",
    answer:
      "Yes. You’ll refine your accent, improve fluency, and speak clearly while keeping your natural voice.",
  },
  {
    question: "How long does the course take?",
    answer:
      "It’s self-paced. You can complete it in weeks or go at your own speed—whatever fits your schedule.",
  },
  {
    question: "Can I fit this into a busy schedule?",
    answer:
      "Absolutely. Short, focused sessions each week are enough to see real results.",
  },
  {
    question: "Is this course only for public speaking?",
    answer:
      "Not at all. It’s designed for everyday conversations, interviews, meetings, presentations, and any situation where you want to be heard and remembered.",
  },
  {
    question: " Will I get personal feedback?",
    answer:
      " Yes. Exercises and optional feedback help you track your progress and refine your skills.",
  },
  {
    question: "What if I’m not confident right now?",
    answer:
      "That’s exactly why this course exists. You’ll build confidence gradually, with practical exercises and real-world practice.",
  },
  {
    question: "Is this suitable for non-native English speakers?",
    answer:
      "Absolutely. The course helps anyone speak clearly, fluently, and confidently in English.",
  },
  {
    question: "What if I don’t see results?",
    answer:
      " Follow the course as designed, and you’ll notice improvement quickly. We also provide guidance and support to ensure your progress.",
  },
];

export default function CourseBenefitsAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* About Me Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            About your Mentor
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Image
                src="/photo.jpg"
                alt="About Me"
                width={400}
                height={400}
                className="rounded-2xl shadow-lg border border-gray-800 object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-300 leading-relaxed"
            >
              <p className="text-yellow-400 font-bold text-xl">Ashwin Kumar</p>
              <p>
                I was born in India, in a place where no one around me spoke
                fluent English. Communication was my biggest weakness, I
                stuttered, hesitated, and couldn’t express myself the way I
                wanted. Speaking with confidence felt impossible.
              </p>
              <p>
                I remember how isolating it was. I had ideas in my mind but no
                way to express them. There were no good speakers around me to
                learn from, no mentors to guide me. It was just me, my voice,
                and a burning desire to get better.
              </p>
              <p>
                So, I made a decision: I would practice every single day. Even
                when it was hard. Even when I sounded awkward. Even when people
                doubted me. That fire inside me pushed me forward. Slowly, my
                stutter faded. My words started flowing. My confidence grew.
              </p>
              <p>
                Today, I can record videos for hours in a single take, speak
                fluently, and communicate with influence. More importantly, I’ve
                helped clients and students do the same—transforming their
                hesitation into confidence, and their weak speech into powerful
                presence.
              </p>
              <p>
                And that’s what I want for you. If I could go from zero to
                building a voice that makes people listen, so can you. All it
                takes is the right system, dedication, and guidance.
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                  className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-left transition-all duration-300 hover:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-200">
                      {faq.question}
                    </h3>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <AnimatePresence>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-gray-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-8 py-4 bg-yellow-400 text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25"
          >
            Join Now!
          </button>
        </motion.div>
      </div>
    </section>
  );
}
