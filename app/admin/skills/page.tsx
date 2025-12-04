"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import { useCallback, useEffect, useState } from "react";

interface Skill {
  id?: number;
  name: string;
  category: string;
  level: string;
  icon_url: string;
  link: string;
}

const initialSkill: Skill = {
  name: "",
  category: "",
  level: "Intermediate",
  icon_url: "",
  link: "",
};

const categories = [
  "Frontend",
  "Backend",
  "DevOps",
  "Database",
  "Mobile",
  "Design",
  "Tools",
  "FullStack",
  "Algo",
  "Other",
];

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

type ToastState = { type: "success" | "error"; text: string } | null;

export default function SkillsAdminPage() {
  const [formData, setFormData] = useState<Skill>(initialSkill);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<ToastState>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setFormData(initialSkill);
    setEditingId(null);
  };

  const fetchSkills = useCallback(async () => {
    setListLoading(true);
    try {
      const response = await fetch("/api/skills");
      const result = await response.json();
      const normalized: Skill[] = (result.data || []).map((skill: any) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        icon_url: skill.icon_url || "",
        link: skill.link ?? skill.skill_link ?? "",
      }));
      setSkills(normalized);
    } catch (error) {
      console.error("Error fetching skills", error);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const isEditing = editingId !== null;
      if (isEditing && (typeof editingId !== "number" || Number.isNaN(editingId))) {
        setMessage({ type: "error", text: "No skill selected for editing." });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/skills", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(isEditing ? { id: editingId } : {}), ...formData }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save skill");
      }

      setMessage({ type: "success", text: isEditing ? "Skill updated successfully!" : "Skill saved successfully!" });
      resetForm();
      fetchSkills();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving skill", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to save skill" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (skill: Skill) => {
    if (typeof skill.id !== "number" || Number.isNaN(skill.id)) {
      console.error("Missing skill id, cannot edit", skill);
      return;
    }

    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon_url: skill.icon_url || "",
      link: skill.link || "",
    });

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-3xl w-full p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 border-2 border-green-500/50 text-green-100"
              : "bg-red-500/20 border-2 border-red-500/50 text-red-100"
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
              placeholder="e.g., React, Python, Docker"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Proficiency Level *</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
            >
              {levels.map((level) => (
                <option key={level} value={level} className="bg-slate-900">
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Supporting context for icon selection */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Icon URL</label>
            <input
              type="url"
              name="icon_url"
              value={formData.icon_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
              placeholder="https://... (SVG or PNG icon)"
            />
            <p className="text-sm opacity-70 mt-2">
              💡 Tip: Use icons from <a href="https://simpleicons.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">Simple Icons</a> or <a href="https://devicon.dev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">Devicon</a>
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">GitHub/Documentation Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
              style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
              placeholder="https://github.com/..."
            />
            <p className="text-sm opacity-70 mt-2">🔗 Link to GitHub repository or official documentation</p>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-8 py-4 rounded-lg font-semibold text-white transition-all hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ backgroundColor: "#1e40af" }}
          >
            {isSubmitting ? "Saving..." : editingId ? "Update Skill" : "Save Skill"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 cursor-pointer"
            style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", border: "2px solid rgba(59, 130, 246, 0.3)" }}
          >
            {editingId ? "Cancel Edit" : "Clear Form"}
          </button>
        </div>
      </motion.form>

      <section className="max-w-5xl w-full mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`${sora.className} text-2xl font-semibold`}>Existing Skills</h2>
          <button type="button" onClick={fetchSkills} className="text-sm underline-offset-4 hover:underline">
            Refresh
          </button>
        </div>
        {listLoading ? (
          <p className="opacity-70">Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="opacity-70">No skills saved yet.</p>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id ?? `${skill.name}-${skill.category}`}
                className="rounded-2xl border border-blue-500/20 bg-white/70 p-5 shadow-sm dark:bg-slate-900/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-blue-500/80">{skill.category || "Uncategorized"}</p>
                    <h3 className={`${sora.className} text-xl font-semibold`}>{skill.name}</h3>
                    <p className="text-sm opacity-70">{skill.level}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEdit(skill)}
                    className="rounded-full border border-blue-500/40 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-500/10"
                  >
                    Edit
                  </button>
                </div>
                {skill.link && (
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 underline-offset-4 hover:underline"
                  >
                    External link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
