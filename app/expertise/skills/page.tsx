"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import SkillFlag from "@/components/skill-flag";
import SkillLegend from "@/components/skill-legend";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon_url?: string | null;
  link?: string | null;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSkills() {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const result = await response.json();
        if (isMounted) {
          setSkills(result.data ?? []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching skills:", err);
          setError(err instanceof Error ? err.message : "Unexpected error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSkills();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryMeta: Record<string, { icon: string; accent: string }> = {
    Frontend: { icon: "mdi:palette-outline", accent: "text-rose-500" },
    Backend: { icon: "mdi:cog-outline", accent: "text-slate-500" },
    Database: { icon: "mdi:database-outline", accent: "text-emerald-500" },
    DevOps: { icon: "mdi:cloud-braces-outline", accent: "text-blue-500" },
    Tools: { icon: "mdi:toolbox-outline", accent: "text-amber-500" },
    Mobile: { icon: "mdi:cellphone-cog", accent: "text-purple-500" },
  };

  const skillsByCategory = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const category = skill.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const categories = useMemo(() => {
    const metaKeys = Object.keys(categoryMeta);
    const metaCategories = metaKeys.map((category) => [
      category,
      skillsByCategory[category] ?? [],
    ] as const);

    const extraCategories = Object.entries(skillsByCategory)
      .filter(([category]) => !categoryMeta[category])
      .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB));

    return [...metaCategories, ...extraCategories];
  }, [skillsByCategory]);

  const isEmpty = !loading && !error && skills.length === 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-start px-6 pb-24 pt-32">
        <motion.h1
          className={`${sora.className} text-center text-5xl md:text-7xl font-semibold md:font-medium tracking-tight mb-12`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="font-bold md:font-semibold">Skills</span>
        </motion.h1>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SkillLegend />
        </motion.div>

        <motion.div
          className="w-full max-w-5xl space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {loading && (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white/60 p-6 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <div className="h-6 w-32 rounded-full bg-slate-200/70 dark:bg-slate-700/70" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, flagIndex) => (
                      <div
                        key={flagIndex}
                        className="h-9 w-24 rounded-full bg-slate-200/70 dark:bg-slate-700/70"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-rose-200/60 bg-rose-50/70 p-6 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
              <p className="font-medium">Something went wrong while loading skills.</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          )}

          {isEmpty && (
            <div className="rounded-3xl border border-slate-200/60 bg-white/60 p-6 text-center dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No skills are published yet. Check back soon!
              </p>
            </div>
          )}

          {!loading && !error &&
            categories.map(([category, groupedSkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + categoryIndex * 0.1 }}
              >
                <h2 className={`${sora.className} mb-6 flex items-center gap-4 text-2xl font-semibold md:text-3xl`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur-sm dark:bg-slate-900/70">
                    <Icon
                      icon={categoryMeta[category]?.icon || "mdi:star-four-points-outline"}
                      width={26}
                      height={26}
                      className={categoryMeta[category]?.accent || "text-amber-500"}
                    />
                  </span>
                  {category}
                </h2>

                <div className="flex flex-wrap gap-3">
                  {groupedSkills.length === 0 ? (
                    <p className="rounded-full border border-dashed border-slate-200/80 px-4 py-2 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
                      No skill here yet.
                    </p>
                  ) : (
                    groupedSkills.map((skill, index) => (
                      <motion.div
                        key={`${skill.id}-${skill.name}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 + categoryIndex * 0.1 + index * 0.05 }}
                      >
                        <SkillFlag
                          name={skill.name}
                          level={skill.level}
                          icon_url={skill.icon_url ?? undefined}
                          link={skill.link ?? undefined}
                        />
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}

          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-300">
            <Icon icon="mdi:lightbulb-on-outline" width={18} height={18} className="text-amber-500" />
            I know a lot of people will hate me after saying this but I can technically do anything thanks to
            <a
              className="ml-1 underline decoration-dotted decoration-amber-500/60 underline-offset-4"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer"
            >
              Vibe Coding
            </a>
            :)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
