"use client";

import { useState, useEffect } from "react";
import useScreenSize from "@/hooks/usescreensize";
import {
GitHubLogoIcon,
LinkedInLogoIcon,
EnvelopeClosedIcon,
ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sora } from "@/app/font";

export default function ContactBar() {
const screenSize = useScreenSize();
const pathname = usePathname();
const isHomePage = pathname === "/";

// Smaller icons on non-home pages for small screens
const iconSize = isHomePage
	? (screenSize < 768 ? 40 : 30)  // Home page: 40px mobile, 30px desktop
	: (screenSize < 768 ? 24 : 30); // Other pages: 24px mobile, 30px desktop

const [isDark, setIsDark] = useState(false);

useEffect(() => {
	// Check initial theme from browser preference
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const htmlElement = document.documentElement;

	if (prefersDark) {
	htmlElement.classList.add("dark");
	htmlElement.style.colorScheme = "dark";
	}

	setIsDark(htmlElement.classList.contains("dark"));
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

return (
	<header className="md:fixed top-0 left-0 right-0 z-50 w-full bg-transparent p-8 flex items-center justify-between" style={{ color: isDark ? 'white' : '#0f172a', boxShadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
	{/* Back Arrow - Only show on non-home pages */}
	<div className="flex-1">
		{!isHomePage && (
		<Link
			href="/"
			className={`${sora.className} inline-flex items-center gap-2 transition hover:opacity-70`}
			style={{ color: isDark ? 'white' : '#0f172a' }}
		>
			<ArrowLeftIcon style={{ width: iconSize, height: iconSize, strokeWidth: 0.5 }} />
						<span className="text-lg md:text-xl font-light tracking-wide">Wael Chatoui</span>
		</Link>
		)}
	</div>
	{/* Right side navigation */}
	<nav className="flex items-center gap-6 flex-1 justify-end">
		<Link
		href="/services"
		className={`${sora.className} px-4 py-2 rounded-lg font-light tracking-wide transition text-sm md:text-base`}
		style={{ 
			color: isDark ? 'white' : '#0f172a',
			border: `1px solid ${isDark ? 'white' : '#0f172a'}`
		}}
		onMouseEnter={(e) => {
			e.currentTarget.style.backgroundColor = isDark ? '#60a5fa' : '#1e40af';
			e.currentTarget.style.color = 'white';
			e.currentTarget.style.borderColor = isDark ? '#60a5fa' : '#1e40af';
		}}
		onMouseLeave={(e) => {
			e.currentTarget.style.backgroundColor = 'transparent';
			e.currentTarget.style.color = isDark ? 'white' : '#0f172a';
			e.currentTarget.style.borderColor = isDark ? 'white' : '#0f172a';
		}}
		>
		My Services
		</Link>

		<a
		href="mailto:contact.fraawdrinn@gmail.com"
		target="_blank"
		rel="noopener noreferrer"
		className="transition"
		style={{ color: isDark ? 'white' : '#0f172a' }}
		onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#60a5fa' : '#1e40af'}
		onMouseLeave={(e) => e.currentTarget.style.color = isDark ? 'white' : '#0f172a'}
		>
		<EnvelopeClosedIcon style={{ width: iconSize, height: iconSize }} />
		</a>

		<a
		href="https://github.com/fraawdrinn"
		target="_blank"
		rel="noopener noreferrer"
		className="transition"
		style={{ color: isDark ? 'white' : '#0f172a' }}
		onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#60a5fa' : '#1e40af'}
		onMouseLeave={(e) => e.currentTarget.style.color = isDark ? 'white' : '#0f172a'}
		>
		<GitHubLogoIcon style={{ width: iconSize, height: iconSize }} />
		</a>

		<a
		href="https://linkedin.com/in/waelchatoui"
		target="_blank"
		rel="noopener noreferrer"
		className="transition"
		style={{ color: isDark ? 'white' : '#0f172a' }}
		onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#60a5fa' : '#1e40af'}
		onMouseLeave={(e) => e.currentTarget.style.color = isDark ? 'white' : '#0f172a'}
		>
		<LinkedInLogoIcon style={{ width: iconSize, height: iconSize }} />
		</a>

		<button
		className="px-4 py-2 rounded flex items-center gap-2 hover:cursor-pointer transition"
		style={{
			backgroundColor: 'transparent',
			color: isDark ? 'white' : '#0f172a'
		}}
		onClick={toggleTheme}
		onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#60a5fa' : '#1e40af'}
		onMouseLeave={(e) => e.currentTarget.style.color = isDark ? 'white' : '#0f172a'}
		>
		<Icon
			icon={isDark ? "mdi:weather-night" : "mdi:weather-sunny"}
			width={iconSize}
			height={iconSize}
		/>
		</button>
	</nav>
	</header>
);
}
