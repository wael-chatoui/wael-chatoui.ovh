import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Code2, User, Globe } from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { viewMode, toggleViewMode, isTechnical } = useViewMode();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const navLinks = [
    { to: '/', label: t('nav.about') }, // Home serves as About/Story
    { to: '/projects', label: t('nav.projects') },
    { to: '/lab', label: t('nav.lab') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-300 ${
      isTechnical ? 'bg-slate-950/80 border-sky-900/50' : 'bg-slate-900/80 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl tracking-tighter">
            <span className={isTechnical ? 'text-sky-400 font-mono' : 'text-slate-100'}>
              {isTechnical ? '<Wael />' : 'Wael.'}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? isTechnical ? 'text-sky-400 bg-sky-950/30' : 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Lang Toggle */}
            <button
              onClick={toggleLang}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Switch Language"
            >
              <span className="flex items-center gap-1 text-xs font-mono uppercase">
                <Globe size={14} /> {i18n.language}
              </span>
            </button>

            {/* View Mode Toggle */}
            <button
              onClick={toggleViewMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isTechnical
                  ? 'border-sky-500 text-sky-400 bg-sky-950/20 hover:bg-sky-950/40'
                  : 'border-slate-600 text-slate-300 hover:border-slate-400'
              }`}
            >
              {isTechnical ? <Code2 size={14} /> : <User size={14} />}
              <span>{isTechnical ? t('common.technicalView') : t('common.recruiterView')}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center justify-between px-3 py-2 mt-4 border-t border-slate-800 pt-4">
               <button onClick={toggleLang} className="text-slate-400 flex items-center gap-2">
                 <Globe size={16} /> {i18n.language.toUpperCase()}
               </button>
               <button onClick={toggleViewMode} className="text-sky-400 flex items-center gap-2">
                 {isTechnical ? <Code2 size={16} /> : <User size={16} />}
                 {isTechnical ? 'Tech' : 'Recruiter'}
               </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
