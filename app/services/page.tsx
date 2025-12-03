"use client";

import { motion } from "framer-motion";
import { sora, poppins } from "@/app/font";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";

export default function ServicesPage() {
const [isDark, setIsDark] = useState(false);
const [formData, setFormData] = useState({
	name: "",
	email: "",
	serviceType: "",
	implementAI: false,
	message: "",
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
const servicePackages = useMemo(
	() => [
	{ title: "Web Applications", highlight: "Dashboards, admin panels, custom SaaS", description: "From Supabase-backed APIs to polished UX, I design resilient apps ready for launch." },
	{ title: "Landing Pages", highlight: "Conversion-first storytelling", description: "High-impact hero sections, motion design, and analytics hooks tailor-made for campaigns." },
	{ title: "Blogs & Content Hubs", highlight: "SEO-ready publishing", description: "Content systems with MDX, CMS integrations, and delightful reading experiences." },
	{ title: "E-commerce Experiences", highlight: "Optimized storefronts", description: "Product journeys with secure checkout, inventory logic, and performance budgets." },
	{ title: "AI & Automation", highlight: "Copilot integrations", description: "Prototype AI copilots, workflow automations, and chat experiences powered by modern APIs." },
	],
	[],
);

const freelancePlatforms = useMemo(
	() => [
	{ label: "Malt", href: "https://www.malt.fr/profile/waelchatoui", blurb: "Instant missions & verified reviews", icon: "mdi:storefront-outline" },
	{ label: "Fiverr", href: "https://fr.fiverr.com/fraaawdrinn/", blurb: "Packaged offers & bundles", icon: "mdi:flash-outline" },
	],
	[],
);

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

const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault();
	setIsSubmitting(true);
	setSubmitStatus("idle");

	try {
	const response = await fetch("/api/contact", {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error || "Failed to send message");
	}

	setSubmitStatus("success");
	// Reset form
	setFormData({
		name: "",
		email: "",
		serviceType: "",
		implementAI: false,
		message: "",
	});
	} catch (error) {
	console.error("Form submission error:", error);
	setSubmitStatus("error");
	} finally {
	setIsSubmitting(false);
	}
};

const handleChange = (
	e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
	const { name, value, type } = e.target;
	if (type === "checkbox") {
	const checked = (e.target as HTMLInputElement).checked;
	setFormData((prev) => ({ ...prev, [name]: checked }));
	} else {
	setFormData((prev) => ({ ...prev, [name]: value }));
	}
};

const inputBaseStyle = {
	backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.8)",
	color: isDark ? "white" : "#0f172a",
	borderColor: isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(148, 163, 184, 0.5)",
};

const labelStyle = {
	color: isDark ? "rgba(226, 232, 240, 0.9)" : "#334155",
};

return (
	<div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8 pb-20">
	{/* Enhanced Halo background */}
	<motion.div
		className="fixed top-1/3 left-1/2 w-96 h-96 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"
		style={{
		backgroundColor: isDark ? "rgba(37, 99, 235, 0.15)" : "rgba(96, 165, 250, 0.2)",
		}}
		animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
		transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
	/>

	<motion.h1
		className={`${sora.className} text-center text-5xl md:text-7xl font-semibold tracking-tight mb-6`}
		initial={{ opacity: 0, y: 40 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8 }}
	>
		My <span className="font-bold">Services</span>
	</motion.h1>

	<motion.p
		className={`${poppins.className} text-center text-lg md:text-xl mb-12 max-w-2xl`}
		style={{ color: isDark ? "rgba(226, 232, 240, 0.8)" : "#475569" }}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.2 }}
	>
		Let's work together! Fill out the form below and I'll get back to you as soon as possible.
	</motion.p>

	<motion.section
		className="mt-10 w-full max-w-4xl"
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.3 }}
	>
		<div className="flex items-center justify-between gap-6 flex-wrap">
			<div>
				<p className={`${poppins.className} text-sm uppercase tracking-[0.3em] text-blue-500/80`}>What I ship</p>
				<h2 className={`${sora.className} text-3xl font-semibold mt-2 text-slate-900 dark:text-slate-100`}>Product-ready missions</h2>
			</div>
			<a
				href="#contact-form"
				className="group inline-flex items-center gap-2 rounded-full border border-blue-500/40 px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-700 dark:border-blue-400/60 dark:text-blue-300 dark:hover:bg-blue-500/20"
			>
				Skip to brief
				<Icon icon="mdi:arrow-down-circle" className="text-lg transition-transform group-hover:translate-y-0.5" />
			</a>
		</div>

		<div className="mt-6 grid gap-4 md:grid-cols-2">
			{servicePackages.map((pkg) => (
				<div
					key={pkg.title}
					className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-lg shadow-slate-200/40 backdrop-blur-sm transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900/60"
				>
					<h3 className={`${sora.className} text-xl font-semibold text-slate-900 dark:text-slate-100`}>{pkg.title}</h3>
					<p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-300">{pkg.highlight}</p>
					<p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{pkg.description}</p>
				</div>
			))}
		</div>

		<div className="mt-8 grid gap-4 md:grid-cols-2">
			{freelancePlatforms.map((platform) => (
				<a
					key={platform.label}
					href={platform.href}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-between rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-blue-600/20 p-5 text-blue-700 shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-blue-500/30 dark:border-blue-500/40 dark:text-blue-200 dark:from-blue-500/10 dark:to-blue-500/5"
				>
					<div>
						<p className={`${poppins.className} text-lg font-semibold`}>{platform.label}</p>
						<p className="text-sm text-blue-900/70 dark:text-blue-100/80">{platform.blurb}</p>
					</div>
					<Icon icon={platform.icon} width={32} height={32} />
				</a>
			))}
		</div>
	</motion.section>

	<motion.div
		className="max-w-2xl w-full mt-16"
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.4 }}
	>
		<form
			id="contact-form"
		onSubmit={handleSubmit}
		className="rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-sm border"
		style={{
			backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.8)",
			borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.5)",
		}}
		>
		{/* Name Field */}
		<div className="mb-6">
			<label
			htmlFor="name"
			className={`${poppins.className} block text-sm font-medium mb-2`}
			style={labelStyle}
			>
			Name *
			</label>
			<input
			type="text"
			id="name"
			name="name"
			value={formData.name}
			onChange={handleChange}
			required
			className={`${poppins.className} w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
				isDark ? "focus:ring-blue-400" : "focus:ring-blue-800"
			}`}
			style={inputBaseStyle}
			placeholder="Your name"
			/>
		</div>

		{/* Email Field */}
		<div className="mb-6">
			<label
			htmlFor="email"
			className={`${poppins.className} block text-sm font-medium mb-2`}
			style={labelStyle}
			>
			Email Address *
			</label>
			<input
			type="email"
			id="email"
			name="email"
			value={formData.email}
			onChange={handleChange}
			required
			className={`${poppins.className} w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
				isDark ? "focus:ring-blue-400" : "focus:ring-blue-800"
			}`}
			style={inputBaseStyle}
			placeholder="your.email@example.com"
			/>
		</div>

		{/* Service Type Field */}
		<div className="mb-6">
			<label
			htmlFor="serviceType"
			className={`${poppins.className} block text-sm font-medium mb-2`}
			style={labelStyle}
			>
			Type of Service *
			</label>
			<select
			id="serviceType"
			name="serviceType"
			value={formData.serviceType}
			onChange={handleChange}
			required
			className={`${poppins.className} w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
				isDark ? "focus:ring-blue-400" : "focus:ring-blue-800"
			}`}
			style={inputBaseStyle}
			>
			<option value="">Select a service</option>
			<option value="landing-page">Landing Page</option>
			<option value="e-commerce">E-commerce</option>
			<option value="blog">Blog</option>
			<option value="other">Other</option>
			</select>
		</div>

		{/* AI Implementation Checkbox */}
		<div className="mb-6">
			<label className="flex items-center gap-3 cursor-pointer">
			<input
				type="checkbox"
				name="implementAI"
				checked={formData.implementAI}
				onChange={handleChange}
				className="w-5 h-5 rounded cursor-pointer accent-blue-600"
				style={{
				accentColor: isDark ? "#60a5fa" : "#1e40af",
				}}
			/>
			<span
				className={`${poppins.className} text-sm font-medium`}
				style={labelStyle}
			>
				Implementing AI?
			</span>
			</label>
		</div>

		{/* Message Field */}
		<div className="mb-8">
			<label
			htmlFor="message"
			className={`${poppins.className} block text-sm font-medium mb-2`}
			style={labelStyle}
			>
			Message *
			</label>
			<textarea
			id="message"
			name="message"
			value={formData.message}
			onChange={handleChange}
			required
			rows={5}
			className={`${poppins.className} w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none ${
				isDark ? "focus:ring-blue-400" : "focus:ring-blue-800"
			}`}
			style={inputBaseStyle}
			placeholder="Tell me about your project..."
			/>
		</div>

		{/* Submit Button */}
		<motion.button
			type="submit"
			disabled={isSubmitting}
			className={`${poppins.className} w-full py-4 rounded-lg font-semibold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
			style={{
			backgroundColor: isDark ? "#1e3a8a" : "#1e40af",
			}}
			whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
			whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
		>
			{isSubmitting ? "Sending..." : "Send Message"}
		</motion.button>

		{/* Status Messages */}
		{submitStatus === "success" && (
			<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={`${poppins.className} mt-4 p-4 rounded-lg text-center font-medium`}
			style={{
				backgroundColor: isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.1)",
				color: isDark ? "#86efac" : "#16a34a",
			}}
			>
			✓ Message sent successfully! I'll get back to you soon.
			</motion.div>
		)}

		{submitStatus === "error" && (
			<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={`${poppins.className} mt-4 p-4 rounded-lg text-center font-medium`}
			style={{
				backgroundColor: isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)",
				color: isDark ? "#fca5a5" : "#dc2626",
			}}
			>
			✗ Something went wrong. Please try again.
			</motion.div>
		)}
		</form>
	</motion.div>
	</div>
);
}
