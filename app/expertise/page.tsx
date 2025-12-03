"use client";

import { AnimatePresence, motion } from "framer-motion";
import { sora, poppins } from "@/app/font";
import Link from "next/link";
import { useState } from "react";
import { Category, CategoryConfig } from "@/types/expertise";
import { useExpertiseData } from "@/hooks/use-expertise-data";
import ExperienceCard from "@/components/expertise/experience-card";
import ProjectCard from "@/components/expertise/project-card";
import HackathonCard from "@/components/expertise/hackathon-card";
import CategoryTabs from "@/components/expertise/category-tabs";
import LoadingSkeleton from "@/components/expertise/loading-skeleton";
import ErrorState from "@/components/expertise/error-state";
import EmptyState from "@/components/expertise/empty-state";
import { useTheme } from "@/components/theme-wrapper";
import { Icon } from "@iconify/react";

export default function ExpertisePage() {
const { experiences, projects, hackathons, loading, error, refetch } = useExpertiseData();
const [activeCategory, setActiveCategory] = useState<Category>('experiences');
const [isSkillsPreviewCollapsed, setIsSkillsPreviewCollapsed] = useState(false);
const { isDark, isHydrated } = useTheme();

const pageBackgroundClass = isHydrated
	? (isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900")
	: "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100";

const categories: CategoryConfig[] = [
	{ id: 'experiences', label: 'Professional', icon: 'mdi:briefcase-variant-outline', count: experiences.length },
	{ id: 'projects', label: 'Projects', icon: 'mdi:rocket-launch-outline', count: projects.length },
	{ id: 'hackathons', label: 'Hackathons', icon: 'mdi:trophy-outline', count: hackathons.length },
];

const skillHighlights = [
	{ icon: "mdi:palette-outline", label: "Frontend", hint: "Design systems & motion" },
	{ icon: "mdi:cog-outline", label: "Backend", hint: "API craftsmanship" },
	{ icon: "mdi:cloud-braces-outline", label: "DevOps", hint: "Cloud-native workflows" },
];

const renderContent = () => {
	if (loading) {
	return <LoadingSkeleton />;
	}

	if (error) {
	return <ErrorState message={error} onRetry={refetch} />;
	}

	if (activeCategory === 'experiences') {
	return experiences.length === 0 ? (
		<EmptyState category="experiences" />
	) : (
		<div className="space-y-4">
		{experiences.map((exp, i) => (
			<ExperienceCard key={exp.id} experience={exp} index={i} />
		))}
		</div>
	);
	}

	if (activeCategory === 'projects') {
	return projects.length === 0 ? (
		<EmptyState category="projects" />
	) : (
		<div className="space-y-4">
		{projects.map((proj, i) => (
			<ProjectCard key={proj.id} project={proj} index={i} />
		))}
		</div>
	);
	}

	if (activeCategory === 'hackathons') {
	return hackathons.length === 0 ? (
		<EmptyState category="hackathons" />
	) : (
		<div className="space-y-4">
		{hackathons.map((hack, i) => (
			<HackathonCard key={hack.id} hackathon={hack} index={i} />
		))}
		</div>
	);
	}
};

return (
	<div className={`relative z-10 min-h-screen w-full transition-colors duration-300 ${pageBackgroundClass}`}>
	<div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-start px-6 pb-24 pt-32">
	<motion.h1
		className={`${sora.className} text-center text-5xl md:text-7xl font-semibold tracking-tight mb-12`}
		initial={{ opacity: 0, y: 40 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8 }}
	>
		My <span className="font-bold">Expertise</span>
	</motion.h1>

	<motion.div
		className="max-w-3xl text-center text-lg text-slate-600 dark:text-slate-300 mb-14"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.3 }}
	>
		From product strategy to shipping polished interfaces, I curate experiences that balance aesthetics, performance, and measurable impact. Dive into the timeline to see how I apply code, design, and leadership across each story.
	</motion.div>

	{/* Skills Button - Mobile */}
	<div className="mb-16 w-full md:hidden">
		<Link
			href="/expertise/skills"
			className={`${poppins.className} flex w-full items-center justify-between rounded-2xl bg-blue-600 px-6 py-5 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:scale-[1.02]`}
		>
			<span className="flex items-center gap-3">
				<Icon icon="mdi:star-four-points-outline" width={24} height={24} className="text-blue-100" />
				Skill Library
			</span>
			<Icon icon="mdi:arrow-right" width={20} height={20} className="text-blue-100" />
		</Link>
	</div>

	{/* Skills Preview - Desktop */}
	<div className="pointer-events-none hidden md:block">
		<motion.div
			layout
			whileHover={{ scale: 1.04, translateY: -6 }}
			className="pointer-events-auto fixed bottom-10 left-12 z-40 w-72 overflow-hidden rounded-3xl border border-blue-500/20 bg-white p-5 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/10 backdrop-blur-xl transition-all duration-300 dark:bg-slate-950/70"
			transition={{ layout: { type: "spring", stiffness: 260, damping: 24 } }}
		>
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
						<Icon icon="mdi:star-four-points-outline" width={26} height={26} />
					</span>
					<span className={`${poppins.className} text-lg font-semibold text-slate-900 dark:text-slate-100`}>
						Explore my skills
					</span>
				</div>
				<div className="flex items-center gap-1">
					<Link
						href="/expertise/skills"
						aria-label="Open skills page"
						className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-500/70 transition-colors duration-200 hover:bg-blue-500/10 hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500/50 dark:text-blue-300 dark:hover:bg-blue-500/20"
					>
						<Icon icon="mdi:arrow-top-right" width={18} height={18} />
					</Link>
					<button
						type="button"
						onClick={() => setIsSkillsPreviewCollapsed((prev) => !prev)}
						aria-label={isSkillsPreviewCollapsed ? "Expand skills preview" : "Collapse skills preview"}
						aria-expanded={!isSkillsPreviewCollapsed}
						className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-500/70 transition-colors duration-200 hover:bg-blue-500/10 hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500/50 dark:text-blue-300 dark:hover:bg-blue-500/20"
					>
						<Icon icon={isSkillsPreviewCollapsed ? "mdi:chevron-down" : "mdi:chevron-up"} width={18} height={18} />
					</button>
				</div>
			</div>
			<AnimatePresence initial={false}>
				{!isSkillsPreviewCollapsed && (
					<motion.div
						key="skills-preview-details"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.28, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="mt-4">
							<Link
								href="/expertise/skills"
										className={`${poppins.className} block space-y-3 text-left text-slate-700 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500/50 dark:text-slate-300 dark:hover:text-blue-200`}
							>
								<p className="text-sm">
									A curated stack across design systems, resilient backends, and cloud-native tooling.
								</p>
								<ul className="space-y-2 text-sm">
									{skillHighlights.map((item) => (
										<li key={item.icon} className="flex items-center gap-2">
											<Icon icon={item.icon} width={18} height={18} className="text-blue-500/80" />
											<span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
											<span className="text-xs text-slate-500 dark:text-slate-400">{item.hint}</span>
										</li>
									))}
								</ul>
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	</div>

	{/* Tabbed Interface */}
	<motion.div
		className="mt-6 w-full"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 0.5 }}
	>
		<CategoryTabs
		categories={categories}
		activeCategory={activeCategory}
		onCategoryChange={setActiveCategory}
		/>

		{/* Content Area */}
		<div className="mt-6 min-h-[400px] rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 text-slate-900 dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-100">
		{renderContent()}
		</div>
	</motion.div>
	</div>
	</div>
);
}
