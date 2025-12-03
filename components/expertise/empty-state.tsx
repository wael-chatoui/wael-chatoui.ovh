"use client";

import { motion } from "framer-motion";
import { Category } from "@/types/expertise";
import { Icon } from "@iconify/react";

interface EmptyStateProps {
category: Category;
}

const categoryLabels: Record<Category, string> = {
experiences: 'professional experiences',
projects: 'projects',
hackathons: 'hackathons'
};

const categoryIcons: Record<Category, string> = {
  experiences: "mdi:briefcase-variant-outline",
  projects: "mdi:rocket-launch-outline",
  hackathons: "mdi:trophy-outline",
};

export default function EmptyState({ category }: EmptyStateProps) {
return (
	<motion.div
	initial={{ opacity: 0, scale: 0.9 }}
	animate={{ opacity: 1, scale: 1 }}
	className="text-center py-20"
	>
	<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-500 dark:bg-blue-400/10">
		<Icon icon={categoryIcons[category]} width={44} height={44} />
	</div>
	<h3 className="text-xl font-semibold mb-2 opacity-80">
		No {categoryLabels[category]} yet
	</h3>
	</motion.div>
);
}

