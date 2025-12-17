import { Github, Linkedin, Mail } from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';

const Footer = () => {
  const { isTechnical } = useViewMode();

  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Wael. {isTechnical ? 'Built with React, Vite & Tailwind.' : 'All rights reserved.'}
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@wael.dev" className="text-slate-400 hover:text-white transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
