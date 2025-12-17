# AGENT MEMORY

## 🧠 Core Philosophy
- **Engineer > Designer**: The site must look like a polished product, not a Dribbble shot.
- **Data-Driven**: All content comes from JSON. No hardcoded text in components.
- **Technical Credibility**: Show the "how", not just the "what".

## 🎨 Design System
- **Background**: Slate 900 (`#0F172A`)
- **Text**: Gray 200 (`#E5E7EB`)
- **Accents**: Sky 400 (`#38BDF8`) & Green 500 (`#22C55E`)
- **Fonts**: Inter (UI/Text), Space Grotesk (Headings), JetBrains Mono (Code)

## 🏗️ Architectural Decisions
- **State**: `ViewModeContext` to toggle between Recruiter (standard) and Technical (dev details) views.
- **I18n**: Files located in `src/i18n/`. Default: English.
- **Styling**: Tailwind CSS v4 (using `@import "tailwindcss";` or PostCSS config).
- **Structure**: Feature-based organization in `components/`.

## ⚠️ Anti-Patterns (Vibe Coding Constraints)
- ❌ No large blurry blobs without purpose.
- ❌ No unconditional glassmorphism.
- ❌ No scroll-jacking or excessive parallax.
- ❌ No generic "I build digital experiences" slogans.
