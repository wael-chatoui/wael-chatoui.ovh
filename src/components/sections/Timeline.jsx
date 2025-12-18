import { useState } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import Container from '../ui/Container';
import experienceData from '../../data/experience.json';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TimelineItem = ({ item, isTechnical, lang }) => {
    const isHackathon = item.type === 'hackathon';
    const [isExpanded, setIsExpanded] = useState(false);

    // Truncate logic
    const description = item.description[lang];
    const shouldTruncate = isHackathon && description.length > 50;
    const displayDescription = shouldTruncate && !isExpanded
        ? `${description.slice(0, 50)}...`
        : description;

    return (
        <div className={`relative pl-8 md:pl-0 transition-opacity hover:opacity-100 ${isHackathon ? 'opacity-60 hover:opacity-100' : ''}`}>
             {/* Timeline Line */}
             <div className="absolute left-[5px] md:left-[20%] top-0 bottom-0 w-px bg-slate-800 -z-10 last:bottom-auto last:h-full"></div>

             <div className={`md:flex gap-12 items-start group ${isHackathon ? 'py-0.5' : ''}`}>

                {/* Date / Meta */}
                <div className="md:w-[20%] mb-1 md:mb-0 md:text-right relative">
                  <span className={`block font-mono ${isHackathon ? 'text-[10px]' : 'text-sm'} ${
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
                        className="group/link inline-flex items-center gap-1 font-medium text-slate-300 hover:text-sky-400 transition-colors"
                      >
                         <span className={isHackathon ? 'text-[10px]' : 'text-sm'}>{item.company}</span>
                         <ExternalLink size={isHackathon ? 10 : 12} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className={`text-slate-400 block ${isHackathon ? 'text-[10px]' : 'text-sm'}`}>
                        {item.company}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dot */}
                <div className={`absolute left-0 md:left-[20%] md:-ml-[5px] rounded-full bg-slate-700 border-2 border-slate-900 group-hover:bg-sky-500 transition-all ${
                    isHackathon ? 'mt-1 w-1.5 h-1.5 md:-ml-[3px]' : 'mt-1.5 w-2.5 h-2.5'
                }`}></div>

                {/* Content */}
                <div className="md:w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-white ${isHackathon ? 'text-sm' : 'text-lg'}`}>
                            {item.role[lang]}
                        </h3>
                        {/* Tags for item type if needed, or keeping it clean */}
                    </div>

                    <div className={`text-slate-400 leading-relaxed ${isHackathon ? 'text-xs max-w-lg' : 'mb-4'}`}>
                        <span>{displayDescription}</span>
                        {shouldTruncate && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="ml-2 text-sky-500 hover:text-sky-400 font-medium inline-flex items-center gap-0.5 cursor-pointer"
                            >
                                {isExpanded ? 'less' : 'more'}
                            </button>
                        )}
                    </div>

                    {/* Skills/Tags */}
                    <div className={`flex flex-wrap gap-2 ${isHackathon ? 'mt-1.5' : 'mt-0'}`}>
                        {item.skills.map(skill => (
                            <span
                                key={skill}
                                className={`rounded ${
                                    isHackathon ? 'text-[9px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
                                } ${
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
    );
};

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
          {experienceData.map((item) => (
             <TimelineItem key={item.id} item={item} isTechnical={isTechnical} lang={lang} />
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
