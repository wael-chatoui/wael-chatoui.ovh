"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Category } from "@/types/expertise";

interface EmptyStateProps {
  category: Category;
}

const categoryLabels: Record<Category, string> = {
  experiences: 'professional experiences',
  projects: 'projects',
  hackathons: 'hackathons'
};

const categoryEmojis: Record<Category, string> = {
  experiences: '💼',
  projects: '🚀',
  hackathons: '🏆'
};

export default function EmptyState({ category }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="text-6xl mb-4">{categoryEmojis[category]}</div>
      <h3 className="text-xl font-semibold mb-2 opacity-80">
        No {categoryLabels[category]} yet
      </h3>
      <p className="text-sm opacity-60">
        Add some through the{' '}
        <Link href="/admin" className="underline text-blue-400 hover:text-blue-300 transition-colors">
          admin panel
        </Link>
      </p>
    </motion.div>
  );
}
