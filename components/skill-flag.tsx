"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SkillFlagProps {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon_url?: string;
  link?: string;
}

const levelColors = {
  Beginner: {
    bg: "rgba(148, 163, 184, 0.2)",      // slate
    border: "rgba(148, 163, 184, 0.5)",
    text: "#94a3b8",
  },
  Intermediate: {
    bg: "rgba(59, 130, 246, 0.2)",       // blue
    border: "rgba(59, 130, 246, 0.5)",
    text: "#60a5fa",
  },
  Advanced: {
    bg: "rgba(168, 85, 247, 0.2)",       // purple
    border: "rgba(168, 85, 247, 0.5)",
    text: "#a855f7",
  },
  Expert: {
    bg: "rgba(34, 197, 94, 0.2)",        // green
    border: "rgba(34, 197, 94, 0.5)",
    text: "#22c55e",
  },
};

export default function SkillFlag({ name, level, icon_url, link }: SkillFlagProps) {
  const colors = levelColors[level];

  const content = (
    <>
      {icon_url && (
        <img
          src={icon_url}
          alt={name}
          className="w-4 h-4 object-contain"
        />
      )}
      <span
        className="text-sm font-medium whitespace-nowrap"
        style={{ color: colors.text }}
      >
        {name}
      </span>
    </>
  );

  const MotionComponent = motion.div;

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <MotionComponent
          className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all cursor-pointer"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: colors.border,
          }}
          transition={{ duration: 0.2 }}
        >
          {content}
        </MotionComponent>
      </Link>
    );
  }

  return (
    <MotionComponent
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all hover:cursor-pointer"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: colors.border,
      }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </MotionComponent>
  );
}
