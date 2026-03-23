'use client';

import { motion } from 'motion/react';

const projects = [
  {
    title: 'Miria',
    description:
      'Plateforme SaaS connectant des experts à leurs clients via IA. Chats personnalisés, réponses 24/7, backoffice de gestion des connaissances.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'AI', 'SaaS'],
    link: 'https://miria.ai',
    github: null,
    isDemo: true,
    year: '2025',
  },
  {
    title: 'Glint',
    description:
      'Site web de crowdsourcing de données visuelles pour entreprises. Pipeline de collecte, validation et sanitisation d\'images par IA — Next.js + Supabase backend.',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'AI'],
    link: null,
    github: null,
    year: '2026',
  },
  {
    title: 'Soufiane Chatoui',
    description:
      'Portfolio d\'un réalisateur & vidéaste. Site vitrine multilingue avec présentation de services (mariages, événements, fashion) et productions.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'next-intl'],
    link: 'https://soufianechatoui.com',
    github: 'https://github.com/wael-chatoui/soufiane-chatoui',
    year: '2026',
  },
  {
    title: 'Niko\' Life',
    description:
      'Site vitrine pour une agence de location de véhicules. Présentation de la flotte, tarifs et formulaire de contact.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS'],
    link: 'https://github.com/wael-chatoui/nikolife-rent',
    github: null,
    year: '2024',
  },
  {
    title: 'Portfolio',
    description:
      'Ce portfolio — design system custom, animations Framer Motion, i18n FR/EN, scroll snap, dark mode.',
    tags: ['Next.js 16', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    link: 'https://wael-chatoui.vercel.app',
    github: 'https://github.com/wael-chatoui/wael-chatoui.ovh',
    year: '2025',
  },
  {
    title: 'Flashscore Scraper',
    description:
      'Pipeline de scraping de données sportives en temps réel — scores, stats, cotes. Extraction, parsing et stockage automatisés.',
    tags: ['Python', 'Playwright', 'Data Pipeline'],
    link: 'https://github.com/wael-chatoui/flashscore-scraper',
    github: null,
    year: '2024',
  },
];

const stack = [
  'Next.js', 'React', 'TypeScript', 'TailwindCSS',
  'Supabase', 'PostgreSQL', 'Node.js', 'Python',
  'Playwright', 'Framer Motion',
];

export default function RippletidePage() {
  return (
    <div className="min-h-screen bg-bg text-text font-body antialiased">
      {/* Grain */}
      <div className="grain" />

      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-text-subtle text-xs tracking-[0.3em] uppercase font-body mb-4">
            Wael Chatoui — Candidature
          </p>
          <h1 className="font-display font-bold text-5xl sm:text-6xl tracking-tight leading-[0.95] mb-6">
            <span className="block">Pour</span>
            <span className="block text-text-muted">Rippletide</span>
          </h1>


          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="mailto:wael.chatoui@student.42paris.fr"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-text text-bg text-sm font-medium rounded-full hover:bg-accent transition-colors no-underline"
            >
              Me contacter
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://github.com/wael-chatoui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-muted text-sm font-medium rounded-full hover:text-text hover:border-text-subtle transition-all no-underline"
            >
              GitHub
            </a>
            <a
              href="https://wael-chatoui.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-muted text-sm font-medium rounded-full hover:text-text hover:border-text-subtle transition-all no-underline"
            >
              Portfolio
            </a>
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-text-subtle text-xs tracking-[0.3em] uppercase font-body mb-8">
            Projets
          </p>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-text-subtle text-xs tracking-[0.3em] uppercase font-body mb-6">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-body text-text-muted px-4 py-2 rounded-full border border-border/50 hover:border-border hover:text-text transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="border-t border-border/30 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-text-subtle text-sm font-body">
            wael-chatoui.vercel.app/rippletide
          </p>
          <a
            href="https://wael-chatoui.vercel.app"
            className="text-text-subtle hover:text-text-muted text-sm font-body transition-colors no-underline"
          >
            ← Portfolio complet
          </a>
        </motion.div>

      </div>
    </div>
  );
}

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const inner = (
    <div className="group p-6 rounded-2xl bg-bg-surface border border-border/50 transition-all duration-300 hover:border-border hover:bg-bg-elevated">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-display text-lg font-bold text-text">{project.title}</h3>
          <span className="text-text-subtle text-xs font-body">{project.year}</span>
          {project.isDemo && (
            <span className="text-xs font-body text-text-subtle px-2.5 py-0.5 rounded-full bg-white/5 border border-border/50">live</span>
          )}
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-text-subtle hover:text-text transition-colors p-1 -mt-1 -mr-1 flex-shrink-0"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
        )}
      </div>
      <p className="text-text-muted text-sm font-body leading-relaxed mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-body text-text-subtle px-2.5 py-0.5 rounded-full border border-border/50">{tag}</span>
        ))}
      </div>
    </div>
  );

  if (!project.link) return <div>{inner}</div>;

  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block no-underline">
      {inner}
    </a>
  );
}
