"use client";

import { sora } from "@/app/font";
import { Category, CategoryConfig } from "@/types/expertise";
import { Icon } from "@iconify/react";

interface CategoryTabsProps {
	categories: CategoryConfig[];
	activeCategory: Category;
	onCategoryChange: (category: Category) => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
	return (
		<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
			{categories.map((cat) => {
				const isActive = activeCategory === cat.id;

				return (
					<button
						key={cat.id}
						onClick={() => onCategoryChange(cat.id)}
						className={`${sora.className} group relative flex cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-white/40 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/80 dark:bg-slate-900/40 dark:hover:border-blue-500/50 dark:hover:bg-slate-900/70 ${isActive ? "border-blue-500/60 bg-white shadow-lg shadow-blue-500/10 dark:bg-slate-900" : ""}`}
					>
						<div className="flex items-center gap-3">
							<span className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-colors ${isActive ? "bg-blue-500/15 text-blue-500" : "bg-slate-200/60 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-500 dark:bg-slate-800/60 dark:text-slate-300"}`}>
								<Icon icon={cat.icon} width={24} height={24} />
							</span>
							<div className="flex flex-col">
								<span className="text-base font-semibold md:text-lg">
									{cat.label}
								</span>
								<span className="text-xs font-medium uppercase tracking-wide text-slate-500 transition-colors group-hover:text-blue-500 dark:text-slate-400">
									{cat.count} {cat.count === 1 ? "entry" : "entries"}
								</span>
							</div>
						</div>
						<Icon
							icon={isActive ? "mdi:arrow-top-right-bold-box" : "mdi:arrow-top-right"}
							className={`text-lg transition-transform duration-200 ${isActive ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1"}`}
						/>
					</button>
				);
			})}
		</div>
	);
}
