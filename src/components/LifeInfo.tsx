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
  },
];

export default function LifeInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  // track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // height from 0→100%
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="communication"
      ref={sectionRef}
      className="relative text-white py-20 px-4 md:px-16 overflow-hidden"
    >
      {/* Always‑visible track + animated purple‑950 fill */}
      <div className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 z-0 bg-white/10 rounded-full">
        <motion.div
          className="w-full bg-purple-500 rounded-full"
          style={{ height }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-20 max-w-6xl mx-auto">
        {lifeInfoData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  priority
                  className="rounded-xl shadow-xl w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain"
                />
              </div>

              {/* Text + Icon + Check‑icon bullets */}
              <div className="w-full ml-4 md:ml-10 ml:ml-5 md:w-1/2 space-y-4">
                <h3 className="flex items-center gap-3 text-3xl md:text-4xl font-bold font-serif text-purple-300">
                  <Icon className="w-20 h-20 ml:h-10 ml:w-10 text-yellow-400" />
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-1 w-5 h-5 text-yellow-400 shrink-0" />
                      <span className="text-white/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
