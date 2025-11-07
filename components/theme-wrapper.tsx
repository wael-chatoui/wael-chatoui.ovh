"use client";

import { useEffect, useState } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
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
    <div style={{ color: isDark ? 'white' : '#0f172a' }}>
      {children}
    </div>
  );
}
