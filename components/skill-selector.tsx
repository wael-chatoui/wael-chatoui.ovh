"use client";

import { useState, useEffect } from "react";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

interface SkillSelectorProps {
  selectedSkills: number[];
  onChange: (skillIds: number[]) => void;
}

export default function SkillSelector({ selectedSkills, onChange }: SkillSelectorProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        setSkills(result.data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSkill = (skillId: number) => {
    if (selectedSkills.includes(skillId)) {
      onChange(selectedSkills.filter(id => id !== skillId));
    } else {
      onChange([...selectedSkills, skillId]);
    }
  };

  if (loading) {
    return <div className="text-sm opacity-70">Loading skills...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Search Skills</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or category..."
          className="w-full px-4 py-2 rounded-lg border-2 bg-transparent transition-all focus:outline-none focus:border-blue-500"
          style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
        />
      </div>

      <div className="max-h-60 overflow-y-auto space-y-2 p-4 rounded-lg border-2" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}>
        {filteredSkills.length === 0 ? (
          <p className="text-sm opacity-70">No skills found. Add skills in the admin panel first.</p>
        ) : (
          filteredSkills.map(skill => (
            <label
              key={skill.id}
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-500/10 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.id)}
                onChange={() => toggleSkill(skill.id)}
                className="w-4 h-4 rounded"
              />
              <span className="flex-1">
                <span className="font-medium">{skill.name}</span>
                <span className="text-xs opacity-70 ml-2">({skill.category})</span>
              </span>
              <span className="text-xs px-2 py-1 rounded" style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa'
              }}>
                {skill.level}
              </span>
            </label>
          ))
        )}
      </div>

      {selectedSkills.length > 0 && (
        <p className="text-sm opacity-70">
          {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}
