import { useViewMode } from '../../context/ViewModeContext';
import Container from '../ui/Container';
import skillsData from '../../data/skills.json';

const Skills = () => {
  const { isTechnical } = useViewMode();

  return (
    <section className="py-16 md:py-24 border-t border-slate-800/50">
      <Container>
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isTechnical ? 'const stack = {' : 'Technical Skills'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([key, category]) => (
            <div key={key} className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                {isTechnical ? `"${key}"` : category.label}
              </h3>

              <ul className="space-y-3">
                {category.items.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between group">
                    <span className={`text-slate-300 ${isTechnical ? 'font-mono text-sm' : ''}`}>
                      {skill.name}
                    </span>
                    {isTechnical && (
                      <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500/50 group-hover:bg-sky-400 transition-all"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {isTechnical && (
          <div className="mt-8 font-mono text-slate-500 text-sm">
            {'}; // Stack definition'}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Skills;
