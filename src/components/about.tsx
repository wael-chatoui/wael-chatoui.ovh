'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="snap-section relative min-h-screen flex items-center py-20 lg:py-0">
      {/* Top separator line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <p className="text-text-subtle text-xs tracking-[0.3em] uppercase font-body mb-3">
              01
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
              {t('title')}
            </h2>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-6">
            {['p1', 'p2', 'p3'].map((key, i) => (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-text-muted text-base lg:text-lg leading-relaxed font-body"
              >
                {t(key)}
              </motion.p>
            ))}

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 pt-4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-text-subtle text-sm font-body">
                42 Paris - Common Core
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
