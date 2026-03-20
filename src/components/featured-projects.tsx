'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const projects = [
  {
    title: 'wael-chatoui.ovh',
    description: 'Personal portfolio built with Next.js 15, TailwindCSS, and Framer Motion.',
    tags: ['Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/wael-chatoui/wael-chatoui.ovh',
  },
  {
    title: 'More coming soon',
    description: 'Currently working on new projects. Stay tuned.',
    tags: ['In Progress'],
    link: null,
  },
];

export default function FeaturedProjects() {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="snap-section relative min-h-screen flex items-center py-20 lg:py-0">
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
            03
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer group block no-underline"
                >
                  <ProjectCard project={project} />
                </a>
              ) : (
                <div className="group">
                  <ProjectCard project={project} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/wael-chatoui"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center gap-2 text-text-muted hover:text-text text-sm font-body transition-colors no-underline"
          >
            {t('viewAll')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <div className="h-full p-6 lg:p-8 rounded-2xl bg-bg-surface border border-border/50 transition-all duration-300 group-hover:border-border group-hover:bg-bg-elevated">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-xl font-bold text-text">
          {project.title}
        </h3>
        {project.link && (
          <svg
            className="w-5 h-5 text-text-subtle group-hover:text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        )}
      </div>
      <p className="text-text-muted text-sm font-body mb-6 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-body text-text-subtle px-3 py-1 rounded-full border border-border/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
