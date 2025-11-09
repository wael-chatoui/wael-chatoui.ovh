"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/expertise";
import SkillFlag from "@/components/skill-flag";
import Link from "next/link";
import Image from "next/image";

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
	className="flex flex-col md:flex-row justify-between items-start gap-4 p-6 rounded-xl border-2 hover:scale-[1.01] transition-all"
	style={{
		backgroundColor: 'rgba(168, 85, 247, 0.05)',
		borderColor: 'rgba(168, 85, 247, 0.2)'
	}}
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
		<h3 className="text-xl font-semibold">{project.name}</h3>
		{project.featured && (
			<span
			className="text-xs px-2 py-1 rounded-full"
			style={{
				backgroundColor: 'rgba(168, 85, 247, 0.2)',
				color: '#a855f7'
			}}
			>
			⭐ Featured
			</span>
		)}
		</div>
		<p className="text-sm opacity-70 mb-3 line-clamp-2">{project.description}</p>

		<div className="flex gap-3 text-sm">
		{project.github_link && (
			<Link
			href={project.github_link}
			target="_blank"
			rel="noopener noreferrer"
			className="opacity-70 hover:opacity-100 transition-opacity underline"
			>
			🔗 GitHub
			</Link>
		)}
		{project.live_link && (
			<Link
			href={project.live_link}
			target="_blank"
			rel="noopener noreferrer"
			className="opacity-70 hover:opacity-100 transition-opacity underline"
			>
			🚀 Live Demo
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
