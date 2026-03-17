'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionStepper() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show stepper after initial page load animation
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.4,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
    >
      {/* Vertical line behind dots */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />

      {sections.map((section, i) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="relative group flex items-center py-3 cursor-pointer bg-transparent border-none outline-none"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label - appears on hover or when active */}
            <motion.span
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -8,
              }}
              className="absolute right-full mr-4 text-xs font-body tracking-wider uppercase whitespace-nowrap text-text-muted group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none"
              style={{
                opacity: isActive ? 1 : undefined,
              }}
            >
              <span className="group-hover:opacity-100">{section.label}</span>
            </motion.span>

            {/* Dot / indicator */}
            <div className="relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.6,
                  backgroundColor: isActive
                    ? 'rgba(250, 250, 250, 1)'
                    : 'rgba(113, 113, 122, 0.4)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-2.5 h-2.5 rounded-full group-hover:scale-100 transition-transform duration-300"
              />
              {/* Active glow ring */}
              {isActive && (
                <motion.div
                  layoutId="stepper-ring"
                  className="absolute -inset-1.5 rounded-full border border-text/30"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>

            {/* Section number */}
            <motion.span
              initial={false}
              animate={{
                opacity: isActive ? 0.6 : 0,
                x: isActive ? 0 : 8,
              }}
              className="absolute left-full ml-4 text-[10px] font-body text-text-subtle tabular-nums pointer-events-none"
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
          </button>
        );
      })}
    </motion.div>
  );
}
