"use client";

import { sora } from "@/app/font";
import { Category, CategoryConfig } from "@/types/expertise";

interface CategoryTabsProps {
categories: CategoryConfig[];
activeCategory: Category;
onCategoryChange: (category: Category) => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
return (
	<div className="flex border-b-2" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
	{categories.map((cat) => (
		<button
		key={cat.id}
		onClick={() => onCategoryChange(cat.id)}
		className={`${sora.className} flex-1 py-4 px-6 text-lg font-semibold transition-all`}
		style={{
			backgroundColor: activeCategory === cat.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
			borderBottom: activeCategory === cat.id ? '3px solid #3b82f6' : '3px solid transparent',
			color: activeCategory === cat.id ? '#60a5fa' : 'inherit',
		}}
		>
		<span className="mr-2">{cat.icon}</span>
		{cat.label}
		<span className="ml-2 text-sm opacity-70">({cat.count})</span>
		</button>
	))}
	</div>
);
}
