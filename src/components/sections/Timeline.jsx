import { useViewMode } from '../../context/ViewModeContext';
import Container from '../ui/Container';
import experienceData from '../../data/experience.json';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { isTechnical } = useViewMode();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section className="py-16 md:py-24 border-t border-slate-800/50">
      <Container>
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isTechnical ? 'const experience = [' : 'Experience'}
          </h2>
        </div>

        <div className="space-y-12">
          {experienceData.map((item, index) => (
            <div key={item.id} className="relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="absolute left-[5px] md:left-[20%] top-0 bottom-0 w-px bg-slate-800 -z-10 last:bottom-auto last:h-full"></div>

              <div className="md:flex gap-12 items-start group">
                {/* Date / Meta */}
                <div className="md:w-[20%] mb-2 md:mb-0 md:text-right relative">
                  <span className={`block font-mono text-sm ${
                    isTechnical ? 'text-sky-500' : 'text-slate-500'
                  }`}>
                    {item.date[lang]}
                  </span>
                  <div className="mt-1">
                    {item.link && item.link !== '#' ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors"
                      >
                         {item.company}
                         <ExternalLink size={14} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400 block">
                        {item.company}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-[20%] md:-ml-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-slate-900 group-hover:bg-sky-500 transition-colors"></div>

                {/* Content */}
                <div className="md:w-[80%]">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {item.role[lang]}
                    </h3>
                  </div>

                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {item.description[lang]}
                  </p>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map(skill => (
                      <span
                        key={skill}
                        className={`text-xs px-2 py-1 rounded ${
                          isTechnical
                            ? 'bg-slate-800 text-sky-300 font-mono border border-slate-700'
                            : 'bg-slate-800/50 text-slate-400'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isTechnical && (
          <div className="mt-8 font-mono text-slate-500 text-sm">
            ]; // End experience
          </div>
        )}
      </Container>
    </section>
  );
};

export default Timeline;
