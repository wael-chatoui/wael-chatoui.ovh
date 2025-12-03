"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import useScreenSize from "@/hooks/usescreensize";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sora } from "@/app/font";

export default function ContactBar() {
const screenSize = useScreenSize();
const pathname = usePathname();
const isHomePage = pathname === "/";
const isExpertiseRoot = pathname === "/expertise";
const isExpertiseNested = pathname.startsWith("/expertise/");
const isAdminRoot = pathname === "/admin";
const isAdminNested = pathname.startsWith("/admin/");

// Icon sizing adapts to viewport and context
const iconSize = isHomePage
	? (screenSize < 768 ? 40 : 28)
	: (screenSize < 768 ? 24 : 26);

const [isDark, setIsDark] = useState(false);

useEffect(() => {
	if (typeof window === "undefined") {
	return;
	}

	const htmlElement = document.documentElement;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (prefersDark) {
	htmlElement.classList.add("dark");
	htmlElement.style.colorScheme = "dark";
	}

	requestAnimationFrame(() => {
	setIsDark(htmlElement.classList.contains("dark"));
	});
}, []);

const toggleTheme = () => {
	const htmlElement = document.documentElement;
	const isDarkMode = htmlElement.classList.contains("dark");

	if (isDarkMode) {
	htmlElement.classList.remove("dark");
	htmlElement.style.colorScheme = "light";
	} else {
	htmlElement.classList.add("dark");
	htmlElement.style.colorScheme = "dark";
	}

	setIsDark(!isDarkMode);
};

const baseTextColor = isDark ? "text-slate-100" : "text-slate-900";
const hoverAccent = isDark ? "hover:text-blue-300" : "hover:text-blue-600";
const subtleText = isDark ? "text-slate-300" : "text-slate-500";
const freelanceLinks = useMemo(
	() => [
		{
			label: "Malt",
			icon: "mdi:briefcase-outline",
			href: "https://www.malt.fr/profile/waelchatoui",
		},
		{
			label: "Fiverr",
			icon: "mdi:lightning-bolt-outline",
			href: "https://fr.fiverr.com/fraaawdrinn/",
		},
	],
	[],
);
const [isFreelanceOpen, setIsFreelanceOpen] = useState(false);
const menuRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
	function handleClick(event: MouseEvent) {
		if (!menuRef.current) {
			return;
		}

		if (!menuRef.current.contains(event.target as Node)) {
			setIsFreelanceOpen(false);
		}
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === "Escape") {
			setIsFreelanceOpen(false);
		}
	}

	document.addEventListener("mousedown", handleClick);
	document.addEventListener("keydown", handleEscape);

	return () => {
		document.removeEventListener("mousedown", handleClick);
		document.removeEventListener("keydown", handleEscape);
	};
}, []);
const headerClasses = `md:fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 py-6 transition shadow-lg backdrop-blur-xl ${
	isDark
		? "border-b border-slate-800/60 bg-slate-950/70 shadow-black/30"
		: "border-b border-white/70 bg-white/70 shadow-blue-500/10"
}`;
let backHref: string | null = null;

if (!isHomePage) {
	if (isExpertiseNested) {
		backHref = "/expertise";
	} else if (isExpertiseRoot) {
		backHref = "/";
	} else if (isAdminNested) {
		backHref = "/admin";
	} else if (isAdminRoot) {
		backHref = "/";
	} else {
		backHref = "/";
	}
}

const navIconClasses = `${baseTextColor} ${hoverAccent} transition-colors duration-200`;

return (
	<header className={headerClasses}>
	<div className="flex-1">
		{backHref && (
		<Link
			href={backHref}
			className={`${sora.className} inline-flex items-center gap-3 text-base font-medium ${baseTextColor} ${hoverAccent}`}
		>
			<Icon icon="mdi:arrow-left" width={iconSize} height={iconSize} />
			<span className="text-lg md:text-xl font-semibold tracking-wide">Wael Chatoui</span>
		</Link>
		)}
	</div>
	<nav className="flex flex-1 items-center justify-end gap-4 md:gap-6">
		<Link
			href="/services"
			className={`${sora.className} inline-flex items-center gap-2 rounded-full border border-blue-500/30 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-700 dark:border-blue-400/30 dark:text-blue-300 dark:hover:border-blue-400`}
		>
			<Icon icon="mdi:briefcase-clock" width={18} height={18} />
			My Services
		</Link>

		<a
			href="mailto:contact.fraawdrinn@gmail.com"
			target="_blank"
			rel="noopener noreferrer"
			className={`${navIconClasses} hidden md:inline-flex`}
			aria-label="Email"
		>
			<Icon icon="mdi:email-outline" width={iconSize} height={iconSize} />
		</a>

		<a
			href="https://github.com/wael-chatoui"
			target="_blank"
			rel="noopener noreferrer"
			className={navIconClasses}
			aria-label="GitHub"
		>
			<Icon icon="mdi:github" width={iconSize} height={iconSize} />
		</a>

		<a
			href="https://linkedin.com/in/wael-chatoui"
			target="_blank"
			rel="noopener noreferrer"
			className={navIconClasses}
			aria-label="LinkedIn"
		>
			<Icon icon="mdi:linkedin" width={iconSize} height={iconSize} />
		</a>

		<div className="relative" ref={menuRef}>
			<button
				onClick={() => setIsFreelanceOpen((prev) => !prev)}
				type="button"
					className={`${navIconClasses} inline-flex items-center gap-2 rounded-full border border-slate-200/40 px-3 py-2 text-sm font-medium cursor-pointer dark:border-slate-700/60`}
				aria-expanded={isFreelanceOpen}
				aria-haspopup="menu"
			>
				<Icon icon="mdi:storefront-outline" width={iconSize} height={iconSize} />
				<span className={`${sora.className} hidden text-xs font-semibold tracking-wide md:inline`}>Freelance</span>
				<Icon icon={isFreelanceOpen ? "mdi:chevron-up" : "mdi:chevron-down"} width={18} height={18} />
			</button>
			{isFreelanceOpen && (
				<div
					role="menu"
					className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-lg shadow-slate-800/5 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90"
				>
					<ul className="flex flex-col divide-y divide-slate-200/70 dark:divide-slate-800/70">
						{freelanceLinks.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-blue-500/10 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-blue-500/20 dark:hover:text-blue-200"
									role="menuitem"
								>
									<Icon icon={link.icon} width={18} height={18} />
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>

		<button
			onClick={toggleTheme}
			className={`inline-flex items-center gap-2 rounded-full bg-transparent px-3 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer ${baseTextColor} ${hoverAccent}`}
			aria-label="Toggle theme"
		>
			<span className={`hidden text-xs uppercase tracking-wide ${subtleText} md:inline`}>Theme</span>
			<Icon icon={isDark ? "mdi:weather-night" : "mdi:weather-sunny"} width={iconSize} height={iconSize} />
		</button>
	</nav>
	</header>
	);
}
