"use client";

import useScreenSize from "@/hooks/usescreensize";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AvatarIcon() {
	const screen = useScreenSize();
  const size = screen < 768 ? 150 : 200;
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
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center rounded-full bg-transparent border-4"
      style={{
        width: size * 1.4,
        height: size * 1.4,
        borderColor: isDark ? 'white' : '#0f172a',
      }}
    >
      <Icon
				icon="ph:user-thin"
				width={size}
				height={size}
				color={isDark ? 'white' : '#0f172a'}
      />
    </motion.div>
  );
}
