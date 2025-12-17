import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Terminal } from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';
import Container from '../ui/Container';
import profileData from '../../data/profile.json';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const { isTechnical } = useViewMode();
  const lang = i18n.language; // 'en' or 'fr'

  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={`font-mono text-sm tracking-wider mb-4 ${
                isTechnical ? 'text-sky-400' : 'text-slate-400'
              }`}>
                {isTechnical ? `> const role = "${profileData.role[lang]}";` : profileData.role[lang]}
              </h2>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-display">
                {profileData.tagline[lang]}
              </h1>

              <p className={`text-xl leading-relaxed mb-8 ${
                isTechnical ? 'text-slate-400 font-mono text-sm border-l-2 border-slate-700 pl-4 py-2' : 'text-slate-300'
              }`}>
                {isTechnical
                  ? profileData.bio.long[lang]
                  : profileData.bio.short[lang]}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/projects"
                  className={`group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isTechnical
                      ? 'bg-slate-800 text-sky-400 border border-slate-700 hover:border-sky-500'
                      : 'bg-white text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {isTechnical ? <Terminal size={18} /> : null}
                  <span>{t('nav.projects')}</span>
                  {!isTechnical && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </a>

                <a
                  href="/contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isTechnical
                      ? 'text-slate-400 hover:text-white'
                      : 'text-white border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {t('nav.contact')}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Optional: Right side visual */}
          {/* In technical view, maybe show some stats or code snippet representation */}
          {isTechnical && (
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="hidden md:block w-full max-w-sm"
             >
               <div className="bg-slate-950 rounded-lg border border-slate-800 p-6 font-mono text-xs text-slate-400 shadow-2xl">
                 <div className="flex gap-2 mb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                 </div>
                 <div className="space-y-2">
                   <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> 'react';</p>
                   <p><span className="text-purple-400">const</span> Wael <span className="text-blue-400">=</span> () <span className="text-blue-400">={'>'}</span> {'{'}</p>
                   <p className="pl-4">tools: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Vite'</span>, <span className="text-green-400">'Node'</span>],</p>
                   <p className="pl-4">focus: <span className="text-green-400">'Performance'</span>,</p>
                   <p className="pl-4">location: <span className="text-green-400">'Paris'</span></p>
                   <p>{'}'}</p>
                 </div>
               </div>
             </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
