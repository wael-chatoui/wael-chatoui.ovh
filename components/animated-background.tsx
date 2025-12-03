"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-wrapper";
import { usePathname } from "next/navigation";

export default function AnimatedBackground() {
  const { isDark, isHydrated } = useTheme();
  const pathname = usePathname();
  const isExpertiseRoute = pathname?.startsWith("/expertise") ?? false;

  console.log('[AnimatedBackground] isDark:', isDark, '| isHydrated:', isHydrated, '| isExpertiseRoute:', isExpertiseRoute);

  // Before hydration, show a neutral background to prevent flash
  if (!isHydrated) {
    return <div className="fixed inset-0 -z-10 bg-white dark:bg-slate-950" />;
  }

  // On /expertise in light mode, render a plain white background with no orbs
  if (!isDark && isExpertiseRoute) {
    return <div className="fixed inset-0 -z-10 bg-white" />;
  }

  // For light mode on non-expertise routes, use subtle gradient
  if (!isDark) {
    return (
      <>
        <div
          className="fixed inset-0 -z-10"
          style={{
            background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0, #f8fafc)"
          }}
        />
        <div
          className="fixed inset-0 opacity-20 -z-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(100,100,100,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
        <motion.div
          className="fixed top-[20%] left-[10%] w-96 h-96 rounded-full blur-3xl -z-10"
          style={{ backgroundColor: "rgba(96, 165, 250, 0.3)" }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="fixed bottom-[10%] right-[15%] w-80 h-80 rounded-full blur-3xl -z-10"
          style={{ backgroundColor: "rgba(192, 132, 252, 0.25)" }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        <motion.div
          className="fixed top-[60%] right-[20%] w-72 h-72 rounded-full blur-3xl -z-10"
          style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
      </>
    );
  }

  // Dark mode
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom right, #020617, #0f172a, #020617)"
        }}
      />
      <div
        className="fixed inset-0 opacity-20 -z-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(100,100,100,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />
      <motion.div
        className="fixed top-[20%] left-[10%] w-96 h-96 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="fixed bottom-[10%] right-[15%] w-80 h-80 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: "rgba(168, 85, 247, 0.2)" }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      <motion.div
        className="fixed top-[60%] right-[20%] w-72 h-72 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: "rgba(30, 58, 138, 0.25)" }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 2 }}
      />
    </>
  );
}
