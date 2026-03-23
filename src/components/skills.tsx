'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const skills = [
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'TailwindCSS', icon: 'tailwindcss' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Python', icon: 'python' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Git', icon: 'git' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css3' },
  { name: 'C', icon: 'c' },
  { name: 'Bash', icon: 'bash' },
  { name: 'Claude Code', icon: null, url: 'https://cdn.simpleicons.org/anthropic/ffffff' },
];

function getDevIconUrl(icon: string): string {
  const mapping: Record<string, string> = {
    react: 'react/react-original',
    nextjs: 'nextjs/nextjs-original',
    typescript: 'typescript/typescript-original',
    tailwindcss: 'tailwindcss/tailwindcss-original',
    nodejs: 'nodejs/nodejs-original',
    python: 'python/python-original',
    postgresql: 'postgresql/postgresql-original',
    git: 'git/git-original',
    prisma: 'prisma/prisma-original',
    supabase: 'supabase/supabase-original',
    html5: 'html5/html5-original',
    css3: 'css3/css3-original',
    c: 'c/c-original',
    bash: 'bash/bash-original',
  };
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapping[icon]}.svg`;
}

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="snap-section relative min-h-screen flex items-center py-20 lg:py-0">
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-text-subtle text-xs tracking-[0.3em] uppercase font-body mb-3">
            02
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {t('title')}
          </h2>
          <p className="text-text-muted font-body text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-bg-elevated border border-border/50 flex items-center justify-center transition-all duration-300 group-hover:border-border group-hover:bg-bg-surface group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.url ?? getDevIconUrl(skill.icon!)}
                  alt={skill.name}
                  className="w-8 h-8 lg:w-10 lg:h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: skill.url ? 'none' : 'grayscale(100%) brightness(2)' }}
                  onMouseEnter={(e) => {
                    if (!skill.url) (e.target as HTMLImageElement).style.filter = 'none';
                  }}
                  onMouseLeave={(e) => {
                    if (!skill.url) (e.target as HTMLImageElement).style.filter = 'grayscale(100%) brightness(2)';
                  }}
                />
              </div>
              <span className="text-text-subtle text-xs font-body text-center group-hover:text-text-muted transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
