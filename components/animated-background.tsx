"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from browser preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const htmlElement = document.documentElement;
    
    if (prefersDark && !htmlElement.classList.contains("dark")) {
      htmlElement.classList.add("dark");
      htmlElement.style.colorScheme = "dark";
    }
    
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Radial Gradient Mesh Background */}
      <div 
        className="fixed inset-0 transition-colors duration-500 -z-10"
        style={{
          background: isDark 
            ? 'linear-gradient(to bottom right, #020617, #0f172a, #020617)'
            : 'linear-gradient(to bottom right, #f8fafc, #e2e8f0, #f8fafc)'
        }}
      />
      
      {/* Dot Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-20 -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(100,100,100,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="fixed top-[20%] left-[10%] w-96 h-96 rounded-full blur-3xl -z-10"
        style={{
          backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(96, 165, 250, 0.3)'
        }}
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
        style={{
          backgroundColor: isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(192, 132, 252, 0.25)'
        }}
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
        style={{
          backgroundColor: isDark ? 'rgba(30, 58, 138, 0.25)' : 'rgba(59, 130, 246, 0.2)'
        }}
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
