"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import { useState } from "react";

interface Project {
  id?: number;
  name: string;
  description: string;
  github_link: string;
  live_link: string;
  image_url: string;
  featured: boolean;
}

export default function ProjectsAdminPage() {
  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    github_link: "",
    live_link: "",
    image_url: "",
    featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project data:", formData);
    // TODO: Add Supabase integration
    alert("Project saved! (TODO: Connect to Supabase)");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
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
        🚀 Side <span className="font-bold">Projects</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Project Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., My Awesome App"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500 resize-none"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="Describe your project, its features, and technologies used..."
            />
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-medium mb-2">GitHub Repository</label>
            <input
              type="url"
              name="github_link"
              value={formData.github_link}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="https://github.com/..."
            />
          </div>

          {/* Live Link */}
          <div>
            <label className="block text-sm font-medium mb-2">Live Demo/Website</label>
            <input
              type="url"
              name="live_link"
              value={formData.live_link}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="https://..."
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Project Image/Screenshot URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="https://..."
            />
          </div>

          {/* Featured */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded"
              />
              <span className="text-sm font-medium">
                ⭐ Feature this project on homepage
              </span>
            </label>
            <p className="text-sm opacity-70 mt-2 ml-8">
              Featured projects will be highlighted on your portfolio homepage
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
            Save Project
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              name: "",
              description: "",
              github_link: "",
              live_link: "",
              image_url: "",
              featured: false,
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
