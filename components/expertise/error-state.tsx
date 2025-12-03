"use client";

import { motion } from "framer-motion";
import { poppins } from "@/app/font";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "Failed to load data", onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold mb-2 opacity-80">{message}</h3>
      <p className="text-sm opacity-60 mb-6">Something went wrong while fetching the data.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`${poppins.className} px-6 py-3 text-base font-medium rounded-xl transition-all hover:scale-105 cursor-pointer`}
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 0.5)',
            border: '2px solid',
            color: '#60a5fa'
          }}
        >
          🔄 Try Again
        </button>
      )}
    </motion.div>
  );
}
