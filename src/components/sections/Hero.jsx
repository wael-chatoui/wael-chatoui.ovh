import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Circle, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';
import Container from '../ui/Container';
import profileData from '../../data/profile.json';

const Logo42 = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M30 20 h10 v30 h15 v10 h-15 v15 h-10 v-15 h-15 v-10 l15 -30 z m0 10 l-8 18 h8 v-18 z" />
    <path d="M70 20 h-25 v10 h15 v5 c0 8 -4 14 -12 14 s-12 -6 -12 -14 h-10 c0 15 8 24 22 24 s22 -9 22 -24 v-15 z" />
  </svg>
);

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { isTechnical } = useViewMode();
  const lang = i18n.language;

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl"
        >
           {/* Background 42 Logo */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
              <Logo42 className="w-[600px] h-[600px]" />
           </div>

           {/* Abstract Gradients */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

           <div className="relative z-10 px-6 py-20 md:px-12 md:py-24 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

              {/* Status Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm"
              >
                <Circle size={8} fill="currentColor" className="text-green-400 animate-pulse" />
                <span>Available for work</span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  {profileData.name}<span className="text-sky-500">.</span>
                </h1>
                <h2 className="text-xl md:text-3xl text-gray-400 font-light">
                  {profileData.role[lang]}
                </h2>
              </div>

              {/* Bio */}
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {isTechnical ? profileData.bio.technical[lang] : profileData.bio.recruiter[lang]}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                 <a
                  href="/projects"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg transition-transform hover:-translate-y-1"
                >
                  <span>{t('nav.projects')}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="mailto:contact@wael.dev"
                   className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Mail size={20} />
                  <span>Contact Me</span>
                </a>
              </div>

              {/* Footer Metadata */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-8 text-sm text-gray-500 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Logo42 className="w-5 h-5 opacity-70" />
                     <span>42 Paris</span>
                  </div>
                  <div className="flex gap-4">
                     <a href={profileData.social.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={20}/></a>
                     <a href={profileData.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={20}/></a>
                  </div>
              </div>

           </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
