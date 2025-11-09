"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 py-20">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          className="p-6 rounded-xl border-2"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderColor: 'rgba(59, 130, 246, 0.2)'
          }}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4 opacity-30"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 opacity-20"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 opacity-20"></div>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xs">
              <div className="h-8 w-20 bg-gray-300 rounded-full opacity-20"></div>
              <div className="h-8 w-24 bg-gray-300 rounded-full opacity-20"></div>
              <div className="h-8 w-16 bg-gray-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
