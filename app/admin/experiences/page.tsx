"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import { useState } from "react";

interface Experience {
  id?: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
  image_url: string;
  website: string;
  github_link: string;
}

export default function ExperiencesAdminPage() {
  const [formData, setFormData] = useState<Experience>({
    company_name: "",
    role: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
    image_url: "",
    website: "",
    github_link: "",
  });

  const [isCurrentJob, setIsCurrentJob] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Experience data:", formData);
    // TODO: Add Supabase integration
    alert("Experience saved! (TODO: Connect to Supabase)");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        💼 Professional <span className="font-bold">Experiences</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Company Name *</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., Google"
            />
          </div>

          {/* Role */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Role/Position *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., Senior Frontend Developer"
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="e.g., Paris, France"
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
            <label className="block text-sm font-medium mb-2">
              End Date {isCurrentJob && "(Current)"}
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              disabled={isCurrentJob}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500 disabled:opacity-50"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
            />
            <label className="flex items-center gap-2 mt-2 text-sm">
              <input
                type="checkbox"
                checked={isCurrentJob}
                onChange={(e) => {
                  setIsCurrentJob(e.target.checked);
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, end_date: "" }));
                  }
                }}
                className="rounded"
              />
              I currently work here
            </label>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500 resize-none"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="Describe your responsibilities, achievements, and key projects..."
            />
          </div>

          {/* Company Logo URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Company Logo URL</label>
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

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-2">Company Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
              placeholder="https://company.com"
            />
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-medium mb-2">GitHub Link (Optional)</label>
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
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#1e40af' }}
          >
            Save Experience
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                company_name: "",
                role: "",
                start_date: "",
                end_date: "",
                location: "",
                description: "",
                image_url: "",
                website: "",
                github_link: "",
              });
              setIsCurrentJob(false);
            }}
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
