"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";

export default function ExpertisePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8">
      <motion.h1
        className={`${sora.className} text-center text-5xl md:text-7xl font-semibold md:font-medium tracking-tight mb-12`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mon <span className="font-bold md:font-semibold">Expertise</span>
      </motion.h1>

      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Add your content here */}
      </motion.div>
    </div>
  );
}
