"use client";

import { motion } from "framer-motion";

const levels = [
  {
    name: "Beginner",
    color: "#94a3b8",
    bg: "rgba(148, 163, 184, 0.2)",
    border: "rgba(148, 163, 184, 0.5)",
    description: "Learning the basics",
  },
  {
    name: "Intermediate",
    color: "#60a5fa",
    bg: "rgba(59, 130, 246, 0.2)",
    border: "rgba(59, 130, 246, 0.5)",
    description: "Comfortable with fundamentals",
  },
  {
    name: "Advanced",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.2)",
    border: "rgba(168, 85, 247, 0.5)",
    description: "Deep understanding & experience",
  },
  {
    name: "Expert",
    color: "#22c55e",
    bg: "rgba(34, 197, 94, 0.2)",
    border: "rgba(34, 197, 94, 0.5)",
    description: "Mastery & production experience",
  },
];

export default function SkillLegend() {
  return (
    <motion.div
      className="w-full max-w-4xl p-6 rounded-2xl border-2"
      style={{
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        borderColor: "rgba(59, 130, 246, 0.2)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-lg font-semibold mb-4 opacity-90">Skill Levels</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((level, index) => (
          <motion.div
            key={level.name}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div
              className="w-4 h-4 rounded-full border-2 shrink-0 mt-1"
              style={{
                backgroundColor: level.bg,
                borderColor: level.border,
              }}
            />
            <div className="flex-1">
              <div
                className="font-semibold text-sm mb-1"
                style={{ color: level.color }}
              >
                {level.name}
              </div>
              <div className="text-xs opacity-70">
                {level.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
