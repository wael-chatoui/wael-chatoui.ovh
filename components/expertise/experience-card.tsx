"use client";

import { motion } from "framer-motion";
import { Experience } from "@/types/expertise";
import SkillFlag from "@/components/skill-flag";
import Image from "next/image";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col md:flex-row justify-between items-start gap-4 p-6 rounded-xl border-2 hover:scale-[1.01] transition-all"
      style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderColor: 'rgba(59, 130, 246, 0.2)'
      }}
    >
      {experience.image_url && (
        <div className="w-full md:w-32 h-32 flex-shrink-0 relative rounded-lg overflow-hidden">
          <Image
            src={experience.image_url}
            alt={experience.company_name}
            fill
            sizes="(max-width: 768px) 100vw, 128px"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-1">{experience.role}</h3>
        <p className="text-lg opacity-80 mb-2">{experience.company_name}</p>
        <p className="text-sm opacity-60 mb-2">
          {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
        </p>
        {experience.location && (
          <p className="text-sm opacity-70">📍 {experience.location}</p>
        )}
        {experience.description && (
          <p className="text-sm opacity-70 mt-3 line-clamp-3">{experience.description}</p>
        )}
      </div>
      
      {experience.skills && experience.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 max-w-xs justify-start md:justify-end">
          {experience.skills.map((skill) => (
            <SkillFlag
              key={skill.id}
              name={skill.name}
              level={skill.level}
              icon_url={skill.icon_url}
              link={skill.link}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
