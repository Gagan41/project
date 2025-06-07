"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Check, MessageCircle, Users, GraduationCap } from "lucide-react";

const lifeInfoData = [
  {
    title: "Master Communication Skills",
    icon: MessageCircle,
    description: [
      "World‑class custom modules to improve verbal, written & visual communication.",
      "Practice real‑world conversation scenarios to build confidence fast.",
      "Learn how to persuade, influence & lead in any room.",
    ],
    image: "/lappi.png",
    gradient: "from-gray-800 to-gray-900",
  },
  {
    title: "Network with Communication Experts",
    icon: Users,
    description: [
      "Join a private group of speakers, coaches & negotiators.",
      "Collaborate with like‑minded communicators.",
      "Celebrate breakthroughs & wins together.",
    ],
    image: "/mobile.png",
    gradient: "from-gray-800 to-gray-900",
  },
  {
    title: "Get Mentored by Pros",
    icon: GraduationCap,
    description: [
      "Get direct advice from top‑tier communication mentors.",
      "Weekly group Q&As and 1‑on‑1 feedback sessions.",
      "Stay accountable and on track throughout your journey.",
    ],
    image: "/desk.png",
    gradient: "from-gray-800 to-gray-900",
  },
];

export default function LifeInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-black via-gray-900/20 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl"
          style={{ opacity, scale }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
        >
          Transform Your Communication Journey
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lifeInfoData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="group relative"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${item.gradient})`,
                  }}
                />
                <div className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gray-700">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-800/20 to-gray-900/20 p-4">
                      <Icon className="w-full h-full text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-200">
                      {item.title}
                    </h3>
                    <ul className="space-y-3 text-left">
                      {item.description.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-gray-400"
                        >
                          <Check className="mt-1 w-5 h-5 text-gray-500 shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="relative w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-contain ${idx === 0 ? "scale-110" : idx === 1 ? "scale-125" : ""} transition-transform duration-300 group-hover:scale-[1.15]`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
