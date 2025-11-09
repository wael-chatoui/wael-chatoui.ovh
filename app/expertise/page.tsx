"use client";

import { motion } from "framer-motion";
import { sora, poppins } from "@/app/font";
import Link from "next/link";
import { useState } from "react";
import { Category, CategoryConfig } from "@/types/expertise";
import { useExpertiseData } from "@/hooks/use-expertise-data";
import ExperienceCard from "@/components/expertise/experience-card";
import ProjectCard from "@/components/expertise/project-card";
import HackathonCard from "@/components/expertise/hackathon-card";
import CategoryTabs from "@/components/expertise/category-tabs";
import LoadingSkeleton from "@/components/expertise/loading-skeleton";
import ErrorState from "@/components/expertise/error-state";
import EmptyState from "@/components/expertise/empty-state";

export default function ExpertisePage() {
  const { experiences, projects, hackathons, loading, error, refetch } = useExpertiseData();
  const [activeCategory, setActiveCategory] = useState<Category>('experiences');

  const categories: CategoryConfig[] = [
    { id: 'experiences', label: 'Professional', icon: '💼', count: experiences.length },
    { id: 'projects', label: 'Projects', icon: '🚀', count: projects.length },
    { id: 'hackathons', label: 'Hackathons', icon: '🏆', count: hackathons.length },
  ];

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return <ErrorState message={error} onRetry={refetch} />;
    }

    if (activeCategory === 'experiences') {
      return experiences.length === 0 ? (
        <EmptyState category="experiences" />
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      );
    }

    if (activeCategory === 'projects') {
      return projects.length === 0 ? (
        <EmptyState category="projects" />
      ) : (
        <div className="space-y-4">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} index={i} />
          ))}
        </div>
      );
    }

    if (activeCategory === 'hackathons') {
      return hackathons.length === 0 ? (
        <EmptyState category="hackathons" />
      ) : (
        <div className="space-y-4">
          {hackathons.map((hack, i) => (
            <HackathonCard key={hack.id} hackathon={hack} index={i} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8 pb-20">
      <motion.h1
        className={`${sora.className} text-center text-5xl md:text-7xl font-semibold tracking-tight mb-12`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="font-bold">Expertise</span>
      </motion.h1>

      <motion.div
        className="max-w-4xl w-4/5 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        My passion for{" "}
        <span className="bg-linear-to-r from-sky-400 to-pink-500 bg-clip-text text-transparent">
          computer science
        </span>
        {" "}allowed me to get a grasp of every technologies in order to find my way...
      </motion.div>

      {/* Skills Button - Mobile */}
      <div className="mb-12 md:hidden">
        <Link href="/skills">
          <button 
            className={`${poppins.className} px-8 py-4 text-lg font-medium rounded-full shadow-lg`} 
            style={{ backgroundColor: '#1e40af', color: 'white' }}
          >
            📋 See my skills
          </button>
        </Link>
      </div>

      {/* Skills Button - Desktop Fixed */}
      <div className="hidden md:block fixed bottom-8 left-8 z-40">
        <Link href="/skills">
          <button 
            className={`${poppins.className} px-6 py-3 text-base font-medium rounded-2xl shadow-xl backdrop-blur-md border`} 
            style={{ 
              backgroundColor: 'rgba(30, 64, 175, 0.7)', 
              borderColor: 'rgba(96, 165, 250, 0.3)', 
              color: 'white' 
            }}
          >
            📋 Skills
          </button>
        </Link>
      </div>

      {/* Tabbed Interface */}
      <motion.div 
        className="max-w-6xl w-full" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
      >
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Content Area */}
        <div className="min-h-[400px] p-6" style={{ backgroundColor: 'rgba(59, 130, 246, 0.02)' }}>
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
}
