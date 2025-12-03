"use client";

import { motion } from "framer-motion";
import { Experience } from "@/types/expertise";
import SkillFlag from "@/components/skill-flag";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface ExperienceCardProps {
experience: Experience;
index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
	month: 'short',
	year: 'numeric'
	});
};

return (
	<motion.div
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ delay: index * 0.1 }}
	className="group relative flex flex-col items-start justify-between gap-4 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-lg md:flex-row"
	>
	{experience.image_url && (
		<div className="w-full md:w-32 h-32 shrink-0 relative rounded-lg overflow-hidden">
		<Image
			src={experience.image_url}
			alt={experience.company_name}
			fill
			sizes="(max-width: 768px) 100vw, 128px"
			className="object-cover"
		/>
		</div>
	)}

	<div className="flex-1">
		<h3 className="text-xl font-semibold mb-1">{experience.role}</h3>
		<p className="text-lg opacity-80 mb-2">{experience.company_name}</p>
		<p className="text-sm opacity-60 mb-2">
		{formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
		</p>
		{experience.location && (
		<p className="mt-1 flex items-center gap-2 text-sm text-slate-600 transition-colors group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
			<Icon icon="mdi:map-marker-outline" width={18} height={18} />
			{experience.location}
		</p>
		)}
		{experience.description && (
		<p className="mt-3 line-clamp-3 text-sm text-slate-600 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200">{experience.description}</p>
		)}
	</div>

	{experience.skills && experience.skills.length > 0 && (
		<div className="flex max-w-xs flex-wrap justify-start gap-2 md:justify-end">
		{experience.skills.map((skill) => (
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
