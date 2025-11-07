"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import Link from "next/link";

export default function AdminPage() {
  const sections = [
    {
      title: "Hackathons",
      description: "Manage your hackathon participations",
      href: "/admin/hackathons",
      icon: "🏆",
    },
    {
      title: "Professional Experiences",
      description: "Manage your work experiences",
      href: "/admin/experiences",
      icon: "💼",
    },
    {
      title: "Side Projects",
      description: "Manage your personal projects",
      href: "/admin/projects",
      icon: "🚀",
    },
    {
      title: "Skills",
      description: "Manage your skills and technologies",
      href: "/admin/skills",
      icon: "🧩",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8">
      <motion.h1
        className={`${sora.className} text-center text-5xl md:text-7xl font-semibold md:font-medium tracking-tight mb-12`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Back<span className="font-bold md:font-semibold">office</span>
      </motion.h1>

      <motion.div
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {sections.map((section, index) => (
          <Link
            key={section.href}
            href={section.href}
            className="group"
          >
            <motion.div
              className="p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'rgba(59, 130, 246, 0.3)',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{
                borderColor: 'rgba(59, 130, 246, 0.6)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              }}
            >
              <div className="text-5xl mb-4">{section.icon}</div>
              <h2 className={`${sora.className} text-2xl font-semibold mb-2`}>
                {section.title}
              </h2>
              <p className="opacity-70">{section.description}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
