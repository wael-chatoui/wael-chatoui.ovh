"use client";

import { motion } from "framer-motion";
import { Hackathon } from "@/types/expertise";
import SkillFlag from "@/components/skill-flag";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface HackathonCardProps {
hackathon: Hackathon;
index: number;
}

export default function HackathonCard({ hackathon, index }: HackathonCardProps) {
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
	className="group relative flex flex-col items-start justify-between gap-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-xl md:flex-row"
	>
	{hackathon.image_url && (
		<div className="w-full md:w-32 h-32 shrink-0 relative rounded-lg overflow-hidden">
		<Image
			src={hackathon.image_url}
			alt={hackathon.name}
			fill
			sizes="(max-width: 768px) 100vw, 128px"
			className="object-cover"
		/>
		</div>
	)}

	<div className="flex-1">
		<h3 className="text-xl font-semibold mb-1">{hackathon.name}</h3>
		<p className="text-lg opacity-80 mb-2">{hackathon.organized_by}</p>
		<p className="text-sm opacity-60 mb-2">
		{formatDate(hackathon.start_date)} - {formatDate(hackathon.end_date)}
		</p>

		<div className="flex flex-col gap-2 text-sm text-slate-600 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200">
		{hackathon.location && (
			<span className="inline-flex items-center gap-2">
			<Icon icon="mdi:map-marker-outline" width={18} height={18} />
			{hackathon.location}
			</span>
		)}
		{hackathon.role && (
			<span className="inline-flex items-center gap-2">
			<Icon icon="mdi:account-tie-outline" width={18} height={18} />
			{hackathon.role}
			</span>
		)}
		{typeof hackathon.team_size === "number" && (
			<span className="inline-flex items-center gap-2">
			<Icon icon="mdi:account-group-outline" width={18} height={18} />
			Team of {hackathon.team_size}
			</span>
		)}
		</div>

		{hackathon.description && (
		<p className="mt-3 line-clamp-2 text-sm text-slate-600 transition-colors group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200">{hackathon.description}</p>
		)}

		{(hackathon.github_link || hackathon.project_link) && (
		<div className="flex gap-3 text-sm mt-3">
			{hackathon.github_link && (
			<Link
				href={hackathon.github_link}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1 text-slate-600 transition-colors hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-300"
			>
				<Icon icon="mdi:github" width={18} height={18} />
				GitHub
			</Link>
			)}
			{hackathon.project_link && (
			<Link
				href={hackathon.project_link}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1 text-slate-600 transition-colors hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-300"
			>
				<Icon icon="mdi:rocket-launch-outline" width={18} height={18} />
				Project
			</Link>
			)}
		</div>
		)}
	</div>

	{hackathon.skills && hackathon.skills.length > 0 && (
		<div className="flex flex-wrap gap-2 max-w-xs justify-start md:justify-end">
		{hackathon.skills.map((skill) => (
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
