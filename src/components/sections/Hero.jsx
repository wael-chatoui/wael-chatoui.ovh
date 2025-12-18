import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';
import Container from '../ui/Container';
import profileData from '../../data/profile.json';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { isTechnical } = useViewMode();
  const lang = i18n.language;

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle Background Elements - very minimal as requested */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isTechnical ? 'bg-sky-900' : 'bg-slate-800'}`} />
        </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Left Content - Editorial Style */}
            <div className="md:col-span-8 flex flex-col space-y-8">

                {/* 42 Logo - Top Left */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                >
                    <img
                        src="/42p-removebg-preview.png"
                        alt="42 Paris"
                        className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
                    />
                </motion.div>

                {/* Main Heading & Role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
                        {profileData.name}
                        <span className="text-sky-500">.</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-400 font-light tracking-wide flex items-center gap-3">
                         {profileData.role[lang]}
                    </h2>
                </motion.div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl"
                >
                    <p className={`text-lg md:text-xl leading-relaxed ${isTechnical ? 'text-gray-300 font-mono text-sm md:text-base border-l-2 border-sky-500/30 pl-4' : 'text-gray-400'}`}>
                        {isTechnical ? profileData.bio.technical[lang] : profileData.bio.recruiter[lang]}
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-6 pt-4"
                >
                     <NavLink
                        to="/projects"
                        className="group flex items-center gap-2 text-white font-medium border-b border-sky-500/0 hover:border-sky-500 transition-all pb-1"
                    >
                        <span>{t('nav.projects')}</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-sky-500" />
                    </NavLink>

                    <div className="flex items-center gap-4 text-gray-500">
                        <div className="h-px w-8 bg-gray-800"></div>
                        <a href={profileData.social.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={20}/></a>
                        <a href={profileData.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={20}/></a>
                        <NavLink to="/contact" className="hover:text-white transition-colors"><Mail size={20}/></NavLink>
                    </div>
                </motion.div>
            </div>

            {/* Right Column - potentially for data visualization or minimal stats in V2 */}
            <div className="md:col-span-4 hidden md:flex justify-end items-start opacity-50">
               {/* Minimal decorative or stats could go here, for now keeping it clean as per instructions */}
            </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;
