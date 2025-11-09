"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import SkillFlag from "@/components/skill-flag";
import SkillLegend from "@/components/skill-legend";

export default function SkillsPage() {
  // Comprehensive skills list organized by category
  const skillsByCategory = {
    "Frontend": [
      { name: "React", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/react/61DAFB", link: "https://github.com/facebook/react" },
      { name: "Next.js", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/nextdotjs/000000", link: "https://github.com/vercel/next.js" },
      { name: "TypeScript", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/typescript/3178C6", link: "https://github.com/microsoft/TypeScript" },
      { name: "JavaScript", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/javascript/F7DF1E", link: "https://github.com/topics/javascript" },
      { name: "HTML5", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/css3/1572B6" },
      { name: "Tailwind CSS", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/tailwindcss/06B6D4", link: "https://github.com/tailwindlabs/tailwindcss" },
      { name: "Vue.js", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/vuedotjs/4FC08D", link: "https://github.com/vuejs/vue" },
      { name: "Svelte", level: "Beginner" as const, icon_url: "https://cdn.simpleicons.org/svelte/FF3E00", link: "https://github.com/sveltejs/svelte" },
    ],
    "Backend": [
      { name: "Node.js", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/nodedotjs/339933", link: "https://github.com/nodejs/node" },
      { name: "Python", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/python/3776AB", link: "https://github.com/python/cpython" },
      { name: "Express", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/express/000000", link: "https://github.com/expressjs/express" },
      { name: "FastAPI", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/fastapi/009688", link: "https://github.com/tiangolo/fastapi" },
      { name: "Django", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/django/092E20", link: "https://github.com/django/django" },
      { name: "Go", level: "Beginner" as const, icon_url: "https://cdn.simpleicons.org/go/00ADD8", link: "https://github.com/golang/go" },
      { name: "Rust", level: "Beginner" as const, icon_url: "https://cdn.simpleicons.org/rust/000000", link: "https://github.com/rust-lang/rust" },
    ],
    "Database": [
      { name: "PostgreSQL", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/postgresql/4169E1", link: "https://github.com/postgres/postgres" },
      { name: "MongoDB", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/mongodb/47A248", link: "https://github.com/mongodb/mongo" },
      { name: "Redis", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/redis/DC382D", link: "https://github.com/redis/redis" },
      { name: "MySQL", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/mysql/4479A1", link: "https://github.com/mysql/mysql-server" },
      { name: "Supabase", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/supabase/3FCF8E", link: "https://github.com/supabase/supabase" },
      { name: "Firebase", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/firebase/FFCA28", link: "https://github.com/firebase/firebase-js-sdk" },
    ],
    "DevOps": [
      { name: "Docker", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/docker/2496ED", link: "https://github.com/docker/docker-ce" },
      { name: "Git", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/git/F05032", link: "https://github.com/git/git" },
      { name: "GitHub", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/github/181717", link: "https://github.com" },
      { name: "CI/CD", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/githubactions/2088FF", link: "https://github.com/features/actions" },
      { name: "Linux", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/linux/FCC624", link: "https://github.com/torvalds/linux" },
      { name: "Nginx", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/nginx/009639", link: "https://github.com/nginx/nginx" },
      { name: "Kubernetes", level: "Beginner" as const, icon_url: "https://cdn.simpleicons.org/kubernetes/326CE5", link: "https://github.com/kubernetes/kubernetes" },
    ],
    "Tools": [
      { name: "VS Code", level: "Expert" as const, icon_url: "https://cdn.simpleicons.org/visualstudiocode/007ACC", link: "https://github.com/microsoft/vscode" },
      { name: "Figma", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Postman", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Vim", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/vim/019733", link: "https://github.com/vim/vim" },
      { name: "Notion", level: "Advanced" as const, icon_url: "https://cdn.simpleicons.org/notion/000000" },
    ],
    "Mobile": [
      { name: "React Native", level: "Intermediate" as const, icon_url: "https://cdn.simpleicons.org/react/61DAFB", link: "https://github.com/facebook/react-native" },
      { name: "Flutter", level: "Beginner" as const, icon_url: "https://cdn.simpleicons.org/flutter/02569B", link: "https://github.com/flutter/flutter" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-32 px-8 pb-20">
      <motion.h1
        className={`${sora.className} text-center text-5xl md:text-7xl font-semibold md:font-medium tracking-tight mb-12`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="font-bold md:font-semibold">Skills</span>
      </motion.h1>

      {/* Skill Legend */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <SkillLegend />
      </motion.div>

      {/* Skills by Category */}
      <motion.div
        className="max-w-4xl w-full space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + categoryIndex * 0.1 }}
          >
            <h2 className={`${sora.className} text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3`}>
              <span className="text-3xl">
                {category === "Frontend" && "🎨"}
                {category === "Backend" && "⚙️"}
                {category === "Database" && "🗄️"}
                {category === "DevOps" && "🚀"}
                {category === "Tools" && "🛠️"}
                {category === "Mobile" && "📱"}
              </span>
              {category}
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + categoryIndex * 0.1 + index * 0.05 }}
                >
                  <SkillFlag
                    name={skill.name}
                    level={skill.level}
                    icon_url={skill.icon_url}
                    link={skill.link}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <p className="mt-8 text-sm opacity-70 text-center">
          💡 Click on any skill to view its GitHub repository. Manage skills through the <a href="/admin/skills" className="underline hover:text-blue-400">admin panel</a>.
        </p>
      </motion.div>
    </div>
  );
}
