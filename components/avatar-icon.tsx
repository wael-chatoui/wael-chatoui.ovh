"use client";

import useScreenSize from "@/hooks/usescreensize";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function AvatarIcon() {
	const screen = useScreenSize();
  const sizing = useMemo(() => {
    const isMobile = screen < 768;

    return {
      frameSize: isMobile ? 206 : 266,
      borderWidth: isMobile ? 2.5 : 3,
      ringGap: 0,
      imageScale: isMobile ? 1.08 : 1.06,
    };
  }, [screen]);
  const [isDark, setIsDark] = useState(false);
  const { frameSize, borderWidth, ringGap, imageScale } = sizing;
  const innerSize = frameSize - borderWidth * 2 - ringGap * 2;

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
      className="flex items-center justify-center rounded-full border"
      style={{
        width: frameSize,
        height: frameSize,
        borderColor: isDark ? "#ffffff" : "#0f172a",
        borderWidth,
        padding: ringGap,
      }}
    >
      <div
        className="relative overflow-hidden rounded-full shadow-lg"
        style={{
          width: innerSize,
          height: innerSize,
          boxShadow: isDark
            ? "0 20px 45px rgba(59, 130, 246, 0.25)"
            : "0 20px 45px rgba(15, 23, 42, 0.15)",
        }}
      >
        <Image
          src="/wchatoui.jpg"
          alt="Portrait of Wael Chatoui"
          fill
          sizes="(max-width: 768px) 208px, 268px"
          className="object-cover"
          style={{ transform: `scale(${imageScale})` }}
          priority
        />
      </div>
    </motion.div>
  );
}
