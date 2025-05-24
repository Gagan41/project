"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const benefits = [
  {
    title: "Expert-Led Learning",
    description:
      "Learn from industry professionals with years of real-world experience.",
    icon: "🎓",
  },
  {
    title: "Interactive Sessions",
    description:
      "Engage in live sessions and get your questions answered in real-time.",
    icon: "💬",
  },
  {
    title: "Practical Projects",
    description: "Work on real projects that you can add to your portfolio.",
    icon: "🚀",
  },
  {
    title: "Career Support",
    description:
      "Get guidance on job applications, interviews, and career growth.",
    icon: "💼",
  },
];

const faqs = [
  {
    question: "What is the course duration?",
    answer:
      "The course is designed to be completed in 12 weeks, with flexible learning options available.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No prior experience is required. The course is designed for beginners and intermediate learners.",
  },
  {
    question: "What will I learn?",
    answer:
      "You'll learn essential skills including communication, leadership, and practical project management.",
  },
  {
    question: "Is there a certificate?",
    answer:
      "Yes, you'll receive a certificate upon successful completion of the course.",
  },
];

export default function CourseBenefitsAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Benefits Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Course Benefits
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-purple-500/50">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <span className="text-4xl">{benefit.icon}</span>
                    <h3 className="text-xl font-bold text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                  className="w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left transition-all duration-300 hover:border-purple-500/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-5 h-5 text-purple-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-400" />
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
                        <p className="mt-4 text-gray-300">{faq.answer}</p>
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
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Join the Course Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
