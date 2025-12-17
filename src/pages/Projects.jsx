import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useViewMode } from '../context/ViewModeContext';
import Container from '../components/ui/Container';
import projectsData from '../data/projects.json';
import { ArrowRight, Code2 } from 'lucide-react';

const Projects = () => {
  const { isTechnical } = useViewMode();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="py-20 md:py-32">
      <Container>
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            {isTechnical ? 'const projects = [' : t('projects.title')}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            {isTechnical
              ? '// A collection of systems and interfaces built with performance in mind.'
              : t('projects.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`group relative rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isTechnical
                  ? 'bg-slate-900 border-slate-800 hover:border-sky-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-600'
              }`}
            >
              {/* Image / Preview */}
              <div className="h-48 bg-slate-800 relative overflow-hidden">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 bg-slate-950 flex items-center justify-center text-slate-700 font-mono text-4xl font-bold opacity-20">
                  {project.id.toUpperCase()}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className={`text-xl font-bold mb-1 ${
                       isTechnical ? 'text-sky-400 font-mono' : 'text-white'
                     }`}>
                       {project.title}
                     </h3>
                     <span className="text-xs text-slate-500 font-mono border border-slate-800 px-2 py-0.5 rounded">
                       {project.type}
                     </span>
                  </div>
                  {isTechnical && <Code2 size={20} className="text-slate-600 group-hover:text-sky-500 transition-colors" />}
                </div>

                <p className={`text-sm mb-6 line-clamp-3 ${
                  isTechnical ? 'text-slate-400 font-mono text-xs' : 'text-slate-300'
                }`}>
                  {isTechnical ? `// ${project.technical.architecture}` : (project.description || project.short_desc[lang])}
                </p>

                {isTechnical ? (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technical.stack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] text-sky-300 bg-sky-950/30 px-2 py-1 rounded font-mono">
                        {tech}
                      </span>
                    ))}
                    {project.technical.stack.length > 3 && (
                      <span className="text-[10px] text-slate-500 px-1 py-1">+{project.technical.stack.length - 3}</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center text-sm font-medium text-white group-hover:text-sky-400 transition-colors">
                    {t('projects.viewCaseStudy')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {isTechnical && (
          <div className="mt-16 text-slate-500 font-mono text-sm">
            ]; // End projects array
          </div>
        )}
      </Container>
    </div>
  );
};

export default Projects;
