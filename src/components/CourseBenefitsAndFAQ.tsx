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
  {
    title: "Lifetime Access",
    description: "Access course materials and updates even after completion.",
    icon: "🔑",
  },
  {
    title: "Community Network",
    description:
      "Join a community of learners and professionals for networking.",
    icon: "👥",
  },
  {
    title: "Flexible Learning",
    description: "Learn at your own pace with 24/7 access to course materials.",
    icon: "⏰",
  },
  {
    title: "Regular Updates",
    description:
      "Stay current with industry trends through regular content updates.",
    icon: "🔄",
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
  {
    question: "How much time should I dedicate weekly?",
    answer:
      "We recommend dedicating 6-8 hours per week to get the most out of the course. However, you can adjust this based on your schedule.",
  },
  {
    question: "What support is available if I get stuck?",
    answer:
      "You'll have access to our support team, community forums, and regular office hours with instructors to help you overcome any challenges.",
  },
];

export default function CourseBenefitsAndFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Benefits Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                <div className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gray-700">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <span className="text-4xl">{benefit.icon}</span>
                    <h3 className="text-xl font-bold text-gray-200">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400">{benefit.description}</p>
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
            className="px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25"
          >
            Join the Course Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
