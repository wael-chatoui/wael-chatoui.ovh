'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const publicProjects = [
  {
    title: 'Niko\' Life',
    description: 'Site vitrine pour une agence de location de véhicules. Présentation de la flotte, tarifs et contact.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS'],
    link: 'https://github.com/wael-chatoui/nikolife-rent',
  },
  {
    title: 'Soufiane Chatoui',
    description: 'Portfolio d\'un vidéaste et réalisateur. Présentation de ses services (mariages, événements, fashion) et de ses productions cinématographiques.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'next-intl'],
    link: 'https://soufianechatoui.com',
  },
  {
    title: 'Flashscore Scraper',
    description: 'Scraper de données sportives en temps réel. Extraction et parsing de scores, statistiques et cotes depuis Flashscore avec pipeline de stockage automatisé.',
    tags: ['Python', 'Scraping', 'Data'],
    link: 'https://github.com/wael-chatoui/flashscore-scraper',
  },
  {
    title: 'AI Call - Blackbox',
    description: 'Assistant vocal IA pour la gestion d\'appels entrants. Intègre Blackbox AI pour le traitement du langage naturel et la génération de réponses.',
    tags: ['Python', 'AI', 'NLP', 'Voice'],
    link: 'https://github.com/wael-chatoui/AI-CALL-Blackbox',
  },

  {
    title: 'Dodge Game 2D',
    description: 'Jeu 2D de type dodge développé en Python avec Pygame. Difficulté progressive, gestion des collisions et score persistant.',
    tags: ['Python', 'Pygame', 'Game Dev'],
    link: 'https://github.com/wael-chatoui/Dodge-Game-2D',
  },
  {
    title: 'Portfolio',
    description: 'Ce site - construit avec Next.js 15, TypeScript et TailwindCSS.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS'],
    link: 'https://github.com/wael-chatoui/wael-chatoui.ovh',
  },
];

const hackathonProjects = [
  {
    title: 'Vigil',
    description: 'Dashboard de surveillance firewall en temps réel avec détection intelligente des menaces (SQL injection, XSS, DDoS, brute force). Pipeline Python + WebSocket + React. Fait pour le hackathon CND — Ministère des Armées.',
    tags: ['Python', 'React', 'TypeScript', 'WebSocket'],
    link: 'https://github.com/hindkh21/HACKATHON_CND_TEAM3',
  },
  {
    title: 'HackTheFork',
    description: 'App full-stack construite en 24h en conditions de compétition.',
    tags: ['TypeScript', 'Next.js'],
    link: 'https://github.com/wael-chatoui/HackTheFork',
  },
];

const ecoleProjects = [
  {
    title: '42 - Minishell',
    description: 'Reproduction d\'un shell Unix POSIX from scratch en C. Parsing de commandes, pipes, redirections, variables d\'environnement et built-ins complets.',
    tags: ['C', 'Unix', 'Shell'],
    link: 'https://github.com/wael-chatoui/42-minishell',
  },
  {
    title: '42 - Philosophers',
    description: 'Problème des philosophes implementé en C. Gestion de la concurrence avec threads POSIX et mutex pour éviter deadlocks et race conditions.',
    tags: ['C', 'Threads', 'Concurrency'],
    link: 'https://github.com/wael-chatoui/42-philo',
  },
  {
    title: '42 - FdF',
    description: 'Renderer 3D isométrique wireframe en C avec MiniLibX. Projection de heightmaps en fil de fer avec gestion des transformations.',
    tags: ['C', 'Graphics', '3D'],
    link: 'https://github.com/wael-chatoui/42-FdF',
  },
];

const privateProjects = [
  {
    title: 'Miria',
    description: 'Plateforme SaaS qui connecte des experts à leurs clients via IA. Chats personnalisés, réponses 24/7, backoffice de gestion des connaissances.',
    tags: ['Next.js', 'Supabase', 'AI', 'SaaS'],
    year: 2025,
    demo: 'https://miria.ai',
  },
  {
    title: 'Glint',
    description: 'App iOS de crowdsourcing de données visuelles pour entreprises. Pipeline de collecte, validation et sanitisation d\'images par IA.',
    tags: ['Swift', 'SwiftUI', 'Supabase', 'AI'],
    year: 2026,
  },
];

function HackathonDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-lg bg-bg-surface border border-border/50 rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-text-subtle text-xs tracking-[0.2em] uppercase font-body mb-1">Compétition</p>
            <h3 className="font-display text-2xl font-bold text-text">Hackathons</h3>
            <p className="text-text-muted text-sm font-body mt-1">Projets construits sous pression, en équipe.</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {hackathonProjects.map((project) => (
            <div key={project.title} className="border-l-2 border-border pl-4">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-text hover:text-text-muted transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.title}
                </a>
              </div>
              <p className="text-text-muted text-sm font-body leading-relaxed mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-body text-text-subtle px-2.5 py-0.5 rounded-full border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function EcoleDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-lg bg-bg-surface border border-border/50 rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-text-subtle text-xs tracking-[0.2em] uppercase font-body mb-1">42 Paris</p>
            <h3 className="font-display text-2xl font-bold text-text">Projets d'école</h3>
            <p className="text-text-muted text-sm font-body mt-1">Projets réalisés à 42 Paris en C.</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {ecoleProjects.map((project) => (
            <div key={project.title} className="border-l-2 border-border pl-4">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-text hover:text-text-muted transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.title}
                </a>
              </div>
              <p className="text-text-muted text-sm font-body leading-relaxed mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-body text-text-subtle px-2.5 py-0.5 rounded-full border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function PrivateDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-lg bg-bg-surface border border-border/50 rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-text-subtle text-xs tracking-[0.2em] uppercase font-body mb-1">Privé</p>
            <h3 className="font-display text-2xl font-bold text-text">Projets non publics</h3>
            <p className="text-text-muted text-sm font-body mt-1">En cours ou code propriétaire.</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {privateProjects.map((project) => (
            <div key={project.title} className="border-l-2 border-border pl-4">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="font-display font-semibold text-text">{project.title}</h4>
                <span className="text-text-subtle text-xs font-body">{project.year}</span>
                {'demo' in project && project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-subtle hover:text-text text-xs font-body underline transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(project.demo as string).replace('https://', '')}
                  </a>
                )}
              </div>
              <p className="text-text-muted text-sm font-body leading-relaxed mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-body text-text-subtle px-2.5 py-0.5 rounded-full border border-border/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjects() {
  const t = useTranslations('projects');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ecoleDialogOpen, setEcoleDialogOpen] = useState(false);
  const [hackathonDialogOpen, setHackathonDialogOpen] = useState(false);

  return (
    <>
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
            {publicProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer group block no-underline"
                >
                  <ProjectCard project={project} />
                </a>
              </motion.div>
            ))}

          </div>

          {/* Separator + secondary dialog cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 mb-6 flex items-center gap-4"
          >
            <div className="flex-1 h-px bg-border/30" />
            <span className="text-text-subtle text-xs tracking-[0.2em] uppercase font-body">Voir aussi</span>
            <div className="flex-1 h-px bg-border/30" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hackathon card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <button onClick={() => setHackathonDialogOpen(true)} className="cursor-pointer group block w-full text-left">
                <div className="h-full p-5 rounded-xl bg-bg-surface/60 border border-border/30 transition-all duration-300 group-hover:border-border/60 group-hover:bg-bg-surface">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-base font-semibold text-text-muted group-hover:text-text transition-colors">Hackathons</h3>
                    <svg className="w-4 h-4 text-text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-text-subtle text-xs font-body">{hackathonProjects.length} projets · compétition</p>
                </div>
              </button>
            </motion.div>

            {/* 42 card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <button onClick={() => setEcoleDialogOpen(true)} className="cursor-pointer group block w-full text-left">
                <div className="h-full p-5 rounded-xl bg-bg-surface/60 border border-border/30 transition-all duration-300 group-hover:border-border/60 group-hover:bg-bg-surface">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-base font-semibold text-text-muted group-hover:text-text transition-colors">42 Paris</h3>
                    <svg className="w-4 h-4 text-text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-text-subtle text-xs font-body">{ecoleProjects.length} projets · C / systèmes</p>
                </div>
              </button>
            </motion.div>

            {/* Private card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <button onClick={() => setDialogOpen(true)} className="cursor-pointer group block w-full text-left">
                <div className="h-full p-5 rounded-xl bg-bg-surface/60 border border-border/30 transition-all duration-300 group-hover:border-border/60 group-hover:bg-bg-surface">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-base font-semibold text-text-muted group-hover:text-text transition-colors">Projets privés</h3>
                    <svg className="w-4 h-4 text-text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-text-subtle text-xs font-body">{privateProjects.length} projets · sur demande</p>
                </div>
              </button>
            </motion.div>
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

      {dialogOpen && <PrivateDialog onClose={() => setDialogOpen(false)} />}
      {ecoleDialogOpen && <EcoleDialog onClose={() => setEcoleDialogOpen(false)} />}
      {hackathonDialogOpen && <HackathonDialog onClose={() => setHackathonDialogOpen(false)} />}
    </>
  );
}

function ProjectCard({ project }: { project: typeof publicProjects[number] }) {
  return (
    <div className="h-full p-6 lg:p-8 rounded-2xl bg-bg-surface border border-border/50 transition-all duration-300 group-hover:border-border group-hover:bg-bg-elevated">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-xl font-bold text-text">
          {project.title}
        </h3>
        <svg
          className="w-5 h-5 text-text-subtle group-hover:text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0 mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
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
