"use client";

import AvatarIcon from "@/components/avatar-icon";
import { sora, poppins } from "@/app/font";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
const [isDark, setIsDark] = useState(false);

useEffect(() => {
	const checkTheme = () => {
	setIsDark(document.documentElement.classList.contains("dark"));
	};

	checkTheme();

	const observer = new MutationObserver(checkTheme);
	observer.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ["class"],
	});

	return () => observer.disconnect();
}, []);

return (
	<div className="relative flex flex-col min-h-screen w-screen overflow-hidden">
	{/* Enhanced Halo derrière l'avatar */}
	<motion.div
		className="absolute top-1/2 left-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
		style={{
		backgroundColor: isDark ? 'rgba(37, 99, 235, 0.2)' : 'rgba(96, 165, 250, 0.25)'
		}}
		animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
		transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
	/>

	{/* Avatar et Nom */}
	<main className="flex flex-col items-center justify-center flex-1 px-8 z-10">
		{/* Avatar */}
		<motion.div
		initial={{ opacity: 0, scale: 0.7 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.8, ease: "easeOut" }}
		className="mb-8"
		>
		<AvatarIcon />
		</motion.div>

		{/* Nom avec micro-animations */}
		<motion.h1
		className={`${sora.className} text-center text-5xl md:text-7xl font-semibold md:font-medium tracking-tight`}
		initial={{ opacity: 0, y: 40 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.3 }}
		>
		Wael <span className="font-bold md:font-semibold">CHATOUI</span>
		</motion.h1>
	</main>

	{/* CTA fixé en bas */}
	<motion.div
		className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.95 }}
	>
		<Link
					href="/expertise"
					className={`${poppins.className} px-2 sm:px-8 py-3 text-sm sm:text-base md:text-lg font-medium rounded-full shadow-lg hover:shadow-2xl transition-all min-w-[180px] max-w-xs w-auto text-center`}
					style={{
						backgroundColor: isDark ? '#1e3a8a' : '#1e40af',
						color: 'white'
					}}
				>
					Discover my expertise
				</Link>
	</motion.div>
	</div>
);
}
