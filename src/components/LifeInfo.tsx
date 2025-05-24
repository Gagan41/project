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
    gradient: "from-purple-600 to-pink-600",
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
    gradient: "from-blue-600 to-purple-600",
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
    gradient: "from-yellow-500 to-orange-600",
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
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_50%)]" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl"
          style={{ opacity, scale }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-purple-500/50">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4">
                      <Icon className="w-full h-full text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
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
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <Check className="mt-1 w-5 h-5 text-purple-400 shrink-0" />
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
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Start Your Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
