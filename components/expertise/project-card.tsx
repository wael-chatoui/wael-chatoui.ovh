"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/expertise";
import SkillFlag from "@/components/skill-flag";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface ProjectCardProps {
project: Project;
index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
return (
	<motion.div
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ delay: index * 0.1 }}
	className="group relative flex flex-col items-start justify-between gap-4 rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:bg-purple-100 hover:shadow-xl dark:border-purple-500/10 dark:bg-purple-500/5 dark:hover:border-purple-500/40 dark:hover:bg-purple-500/10 md:flex-row"
	>
	{project.image_url && (
		<div className="w-full md:w-32 h-32 shrink-0 relative rounded-lg overflow-hidden">
		<Image
			src={project.image_url}
			alt={project.name}
			fill
			sizes="(max-width: 768px) 100vw, 128px"
			className="object-cover"
		/>
		</div>
	)}

	<div className="flex-1">
		<div className="flex items-center gap-2 mb-2">
		<h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
		{project.featured && (
			<span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-xs font-semibold text-purple-500 shadow-sm backdrop-blur-sm dark:bg-slate-900/60">
				<Icon icon="mdi:star-four-points-outline" width={16} height={16} />
				Featured
			</span>
		)}
		</div>
		<p className="mb-3 line-clamp-2 text-sm text-slate-600 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200">{project.description}</p>

		<div className="flex gap-4 text-sm">
		{project.github_link && (
			<Link
			href={project.github_link}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1 text-slate-600 transition-colors hover:text-purple-500 dark:text-slate-300 dark:hover:text-purple-300"
			>
			<Icon icon="mdi:github" width={18} height={18} />
			GitHub
			</Link>
		)}
		{project.live_link && (
			<Link
			href={project.live_link}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1 text-slate-600 transition-colors hover:text-purple-500 dark:text-slate-300 dark:hover:text-purple-300"
			>
			<Icon icon="mdi:rocket-launch-outline" width={18} height={18} />
			Live Demo
			</Link>
		)}
		</div>
	</div>

	{project.skills && project.skills.length > 0 && (
		<div className="flex flex-wrap gap-2 max-w-xs justify-start md:justify-end">
		{project.skills.map((skill) => (
			<SkillFlag
			key={skill.id}
			name={skill.name}
			level={skill.level}
			icon_url={skill.icon_url}
			link={skill.link}
			/>
		))}
		</div>
	)}
	</motion.div>
);
}
