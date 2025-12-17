import { useParams, Link } from 'react-router-dom';
import { useViewMode } from '../context/ViewModeContext';
import Container from '../components/ui/Container';
import projectsData from '../data/projects.json';
import { ArrowLeft, Github, ExternalLink, Cpu, Layers, AlertTriangle } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const { isTechnical } = useViewMode();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <Container className="py-32 text-center text-white">
        Project not found
      </Container>
    );
  }

  return (
    <div className="py-20 md:py-32">
      <Container>
        <Link to="/projects" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 font-display ${
              isTechnical ? 'text-sky-400 font-mono' : 'text-white'
            }`}>
              {project.title}
            </h1>

            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              {project.short_desc}
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  {isTechnical ? <AlertTriangle className="text-yellow-500" /> : null}
                  {isTechnical ? 'Constraints' : 'The Problem'}
                </h2>
                <div className={`p-6 rounded-xl ${
                  isTechnical ? 'bg-slate-900 border border-slate-800 font-mono text-sm text-slate-400' : 'bg-slate-800/50 text-slate-300'
                }`}>
                   {isTechnical ? project.technical.challenges : project.problem}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                   {isTechnical ? <Cpu className="text-sky-500" /> : null}
                   {isTechnical ? 'Architecture & Optimization' : 'The Solution'}
                </h2>
                <div className={`p-6 rounded-xl ${
                  isTechnical ? 'bg-slate-900 border border-slate-800 font-mono text-sm text-slate-400' : 'bg-slate-800/50 text-slate-300'
                }`}>
                   {isTechnical ? (
                     <div className="space-y-4">
                       <p><strong className="text-sky-400">Arch:</strong> {project.technical.architecture}</p>
                       <p><strong className="text-sky-400">Opt:</strong> {project.technical.optimization}</p>
                     </div>
                   ) : project.solution}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">
                 {isTechnical ? 'Tech Stack' : 'Technologies'}
               </h3>
               <div className="flex flex-wrap gap-2">
                 {project.technical.stack.map(tech => (
                   <span key={tech} className="bg-slate-800 text-sky-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">
                     {tech}
                   </span>
                 ))}
               </div>
            </div>

            <div className="flex flex-col gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-white transition-colors"
                >
                  <Github size={20} /> View Source
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-200 transition-colors font-bold"
                >
                  <ExternalLink size={20} /> Live Demo
                </a>
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default ProjectDetail;
