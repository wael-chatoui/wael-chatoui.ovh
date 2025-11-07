"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import { useState } from "react";

interface Hackathon {
  id?: number;
  name: string;
  organized_by: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
  image_url: string;
  github_link: string;
  project_link: string;
  role: string;
  team_size: number;
}

export default function HackathonsAdminPage() {
  const [formData, setFormData] = useState<Hackathon>({
    name: "",
    organized_by: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
    image_url: "",
    github_link: "",
    project_link: "",
    role: "",
    team_size: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hackathon data:", formData);
    // TODO: Add Supabase integration
    alert("Hackathon saved! (TODO: Connect to Supabase)");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "team_size" ? parseInt(value) || 0 : value
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
        🏆 Manage <span className="font-bold">Hackathons</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Hackathon Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., HackMIT 2024"
            />
          </div>

          {/* Organized By */}
          <div>
            <label className="block text-sm font-medium mb-2">Organized By</label>
            <input
              type="text"
              name="organized_by"
              value={formData.organized_by}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., MIT"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., Boston, MA"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Start Date *</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-2">End Date *</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., Frontend Developer"
            />
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-sm font-medium mb-2">Team Size</label>
            <input
              type="number"
              name="team_size"
              value={formData.team_size}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500 resize-none"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="Describe the hackathon and your project..."
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Image URL</label>
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

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-medium mb-2">GitHub Link</label>
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

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium mb-2">Project/Demo Link</label>
            <input
              type="url"
              name="project_link"
              value={formData.project_link}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#1e40af' }}
          >
            Save Hackathon
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              name: "",
              organized_by: "",
              start_date: "",
              end_date: "",
              location: "",
              description: "",
              image_url: "",
              github_link: "",
              project_link: "",
              role: "",
              team_size: 1,
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
