import Container from '../components/ui/Container';
import profileData from '../data/profile.json';
import { Mail, Linkedin, Github, Terminal } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

const Contact = () => {
  const { isTechnical } = useViewMode();

  return (
    <div className="py-20 md:py-32 flex flex-col justify-center min-h-[60vh]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <Terminal size={48} className="mx-auto text-sky-500 mb-8" />

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            {isTechnical ? 'Process initiated.' : "Let's work together."}
          </h1>

          <p className="text-xl text-slate-400 mb-12">
            {isTechnical
              ? '// Establishing connection handshake...'
              : "Interested in my profile? I'm open to freelance or full-time opportunities."}
          </p>

          <a
            href={`mailto:${profileData.social.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-200 transition-colors"
          >
            <Mail size={24} />
            {profileData.social.email}
          </a>

          <div className="mt-16 pt-16 border-t border-slate-800 flex justify-center gap-8">
            <SocialLink href={profileData.social.github} icon={<Github />} label="GitHub" />
            <SocialLink href={profileData.social.linkedin} icon={<Linkedin />} label="LinkedIn" />
          </div>
        </div>
      </Container>
    </div>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors group"
  >
    <div className="p-3 rounded-full bg-slate-900 border border-slate-800 group-hover:border-slate-600 transition-colors">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </a>
);

export default Contact;
