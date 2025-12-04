"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import { useCallback, useEffect, useState } from "react";
import SkillSelector from "@/components/skill-selector";

interface HackathonForm {
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

interface HackathonRecord {
  id: number;
  name: string;
  organized_by: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  description: string | null;
  image_url: string | null;
  github_link: string | null;
  project_link: string | null;
  role: string | null;
  team_size: number | null;
  skills?: { id: number }[];
}

const emptyForm: HackathonForm = {
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
};

export default function HackathonsAdminPage() {
  const [formData, setFormData] = useState<HackathonForm>(emptyForm);

  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [hackathons, setHackathons] = useState<HackathonRecord[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData(emptyForm);
    setSelectedSkills([]);
    setEditingId(null);
  };

  const fetchHackathons = useCallback(async () => {
    setListLoading(true);
    try {
      const response = await fetch('/api/hackathons');
      const result = await response.json();
      setHackathons(result.data || []);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHackathons();
  }, [fetchHackathons]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const isEditing = editingId !== null;
      if (isEditing && (typeof editingId !== "number" || Number.isNaN(editingId))) {
        setMessage({ type: "error", text: "No hackathon selected for editing." });
        setIsSubmitting(false);
        return;
      }
      const response = await fetch('/api/hackathons', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(isEditing ? { id: editingId } : {}),
          ...formData,
          skill_ids: selectedSkills
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save hackathon');
      }

      setMessage({ type: 'success', text: isEditing ? 'Hackathon updated successfully!' : 'Hackathon saved successfully with linked skills!' });
      resetForm();
      fetchHackathons();

      setTimeout(() => setMessage(null), 3000);

    } catch (error) {
      console.error('Error saving hackathon:', error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save hackathon'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "team_size" ? parseInt(value) || 0 : value
    }));
  };

  const handleEdit = (hackathon: HackathonRecord) => {
    if (typeof hackathon.id !== 'number' || Number.isNaN(hackathon.id)) {
      console.error('Missing hackathon id, cannot edit', hackathon);
      return;
    }
    setEditingId(hackathon.id);
    setFormData({
      name: hackathon.name || "",
      organized_by: hackathon.organized_by || "",
      start_date: hackathon.start_date?.slice(0, 10) || "",
      end_date: hackathon.end_date?.slice(0, 10) || "",
      location: hackathon.location || "",
      description: hackathon.description || "",
      image_url: hackathon.image_url || "",
      github_link: hackathon.github_link || "",
      project_link: hackathon.project_link || "",
      role: hackathon.role || "",
      team_size: typeof hackathon.team_size === "number" ? hackathon.team_size : 1,
    });
    setSelectedSkills(hackathon.skills?.map(skill => skill.id) || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8 pb-20">
      <motion.h1
        className={`${sora.className} text-center text-4xl md:text-6xl font-semibold tracking-tight mb-12`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🏆 {editingId ? 'Edit' : 'Manage'} <span className="font-bold">Hackathons</span>
      </motion.h1>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-3xl w-full p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/20 border-2 border-green-500/50 text-green-100'
              : 'bg-red-500/20 border-2 border-red-500/50 text-red-100'
          }`}
        >
          {message.text}
        </motion.div>
      )}

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

          {/* Skills Selector */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Related Skills</label>
            <SkillSelector
              selectedSkills={selectedSkills}
              onChange={setSelectedSkills}
            />
            <p className="text-sm opacity-70 mt-2">
              💡 Select the skills/technologies used in this hackathon
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ backgroundColor: '#1e40af' }}
          >
            {isSubmitting ? 'Saving...' : editingId ? 'Update Hackathon' : 'Save Hackathon'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            {editingId ? 'Cancel Edit' : 'Clear Form'}
          </button>
        </div>
      </motion.form>

      <section className="max-w-5xl w-full mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`${sora.className} text-2xl font-semibold`}>Existing Hackathons</h2>
          <button
            type="button"
            onClick={fetchHackathons}
            className="text-sm underline-offset-4 hover:underline"
          >
            Refresh
          </button>
        </div>
        {listLoading ? (
          <p className="opacity-70">Loading hackathons...</p>
        ) : hackathons.length === 0 ? (
          <p className="opacity-70">No hackathons saved yet.</p>
        ) : (
          <div className="space-y-4">
            {hackathons.map(hack => (
              <div
                key={hack.id}
                className="rounded-2xl border border-blue-500/20 bg-white/70 p-5 shadow-sm dark:bg-slate-900/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-blue-500/80">{hack.organized_by || 'Hackathon'}</p>
                    <h3 className={`${sora.className} text-xl font-semibold`}>{hack.name}</h3>
                    <p className="text-sm opacity-70">
                      {hack.start_date?.slice(0, 10)} → {hack.end_date?.slice(0, 10)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEdit(hack)}
                    className="rounded-full border border-blue-500/40 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-500/10"
                  >
                    Edit
                  </button>
                </div>
                {hack.skills && hack.skills.length > 0 && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    {hack.skills.length} skill{hack.skills.length === 1 ? '' : 's'} linked
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
