"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import { useState } from "react";

interface Skill {
  id?: number;
  name: string;
  category: string;
  level: string;
  icon_url: string;
}

export default function SkillsAdminPage() {
  const [formData, setFormData] = useState<Skill>({
    name: "",
    category: "",
    level: "Intermediate",
    icon_url: "",
  });

  const categories = [
    "Frontend",
    "Backend",
    "DevOps",
    "Database",
    "Mobile",
    "Design",
    "Tools",
    "Other"
  ];

  const levels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Skill data:", formData);
    // TODO: Add Supabase integration
    alert("Skill saved! (TODO: Connect to Supabase)");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8 pb-20">
      <motion.h1
        className={`${sora.className} text-center text-4xl md:text-6xl font-semibold tracking-tight mb-12`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🧩 Manage <span className="font-bold">Skills</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skill Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., React, Python, Docker"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium mb-2">Proficiency Level *</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
            >
              {levels.map(level => (
                <option key={level} value={level} className="bg-slate-900">
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Icon URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Icon URL</label>
            <input
              type="url"
              name="icon_url"
              value={formData.icon_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="https://... (SVG or PNG icon)"
            />
            <p className="text-sm opacity-70 mt-2">
              💡 Tip: Use icons from{" "}
              <a 
                href="https://simpleicons.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-400"
              >
                Simple Icons
              </a>
              {" "}or{" "}
              <a 
                href="https://devicon.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-400"
              >
                Devicon
              </a>
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#1e40af' }}
          >
            Save Skill
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              name: "",
              category: "",
              level: "Intermediate",
              icon_url: "",
            })}
            className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            Clear Form
          </button>
        </div>
      </motion.form>
    </div>
  );
}
