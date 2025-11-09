"use client";

import { motion } from "framer-motion";
import { Hackathon } from "@/types/expertise";
import SkillFlag from "@/components/skill-flag";
import Link from "next/link";
import Image from "next/image";

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
	className="flex flex-col md:flex-row justify-between items-start gap-4 p-6 rounded-xl border-2 hover:scale-[1.01] transition-all"
	style={{
		backgroundColor: 'rgba(34, 197, 94, 0.05)',
		borderColor: 'rgba(34, 197, 94, 0.2)'
	}}
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

		<div className="flex flex-col gap-1 text-sm opacity-70">
		{hackathon.location && <p>📍 {hackathon.location}</p>}
		{hackathon.role && <p>👤 Role: {hackathon.role}</p>}
		{hackathon.team_size && <p>👥 Team Size: {hackathon.team_size}</p>}
		</div>

		{hackathon.description && (
		<p className="text-sm opacity-70 mt-3 line-clamp-2">{hackathon.description}</p>
		)}

		{(hackathon.github_link || hackathon.project_link) && (
		<div className="flex gap-3 text-sm mt-3">
			{hackathon.github_link && (
			<Link
				href={hackathon.github_link}
				target="_blank"
				rel="noopener noreferrer"
				className="opacity-70 hover:opacity-100 transition-opacity underline"
			>
				🔗 GitHub
			</Link>
			)}
			{hackathon.project_link && (
			<Link
				href={hackathon.project_link}
				target="_blank"
				rel="noopener noreferrer"
				className="opacity-70 hover:opacity-100 transition-opacity underline"
			>
				🚀 Project
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
