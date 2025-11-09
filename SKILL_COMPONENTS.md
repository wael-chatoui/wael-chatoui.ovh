# Skill Components Documentation

## 🏷️ Skill Flag Component

A beautiful, color-coded skill badge component that displays skills with their mastery level.

### Component: `SkillFlag`

**Location:** `/components/skill-flag.tsx`

**Props:**
```typescript
interface SkillFlagProps {
  name: string;                                    // Skill name
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon_url?: string;                               // Optional icon URL
}
```

**Features:**
- 🎨 Color-coded by mastery level
- 🖼️ Optional icon support
- ✨ Hover animation (scale + color change)
- 📱 Responsive design
- 🎯 Rounded pill shape

**Usage:**
```tsx
import SkillFlag from "@/components/skill-flag";

<SkillFlag 
  name="React" 
  level="Expert" 
  icon_url="https://cdn.simpleicons.org/react/61DAFB"
/>
```

---

## 📊 Skill Legend Component

A legend/scale that explains the color coding for skill levels.

### Component: `SkillLegend`

**Location:** `/components/skill-legend.tsx`

**Features:**
- 📋 Shows all 4 skill levels
- 🎨 Color indicators
- 📝 Level descriptions
- 📱 Responsive grid (1-4 columns)
- ✨ Staggered animations

**Usage:**
```tsx
import SkillLegend from "@/components/skill-legend";

<SkillLegend />
```

---

## 🎨 Color Scheme

### Skill Levels & Colors:

| Level | Color | Hex | Description |
|-------|-------|-----|-------------|
| **Beginner** | 🔘 Slate | `#94a3b8` | Learning the basics |
| **Intermediate** | 🔵 Blue | `#60a5fa` | Comfortable with fundamentals |
| **Advanced** | 🟣 Purple | `#a855f7` | Deep understanding & experience |
| **Expert** | 🟢 Green | `#22c55e` | Mastery & production experience |

### Color Values:

```typescript
const levelColors = {
  Beginner: {
    bg: "rgba(148, 163, 184, 0.2)",
    border: "rgba(148, 163, 184, 0.5)",
    text: "#94a3b8",
  },
  Intermediate: {
    bg: "rgba(59, 130, 246, 0.2)",
    border: "rgba(59, 130, 246, 0.5)",
    text: "#60a5fa",
  },
  Advanced: {
    bg: "rgba(168, 85, 247, 0.2)",
    border: "rgba(168, 85, 247, 0.5)",
    text: "#a855f7",
  },
  Expert: {
    bg: "rgba(34, 197, 94, 0.2)",
    border: "rgba(34, 197, 94, 0.5)",
    text: "#22c55e",
  },
};
```

---

## 📖 Example Implementation

### Expertise Page Example:

```tsx
"use client";

import SkillFlag from "@/components/skill-flag";
import SkillLegend from "@/components/skill-legend";

export default function ExpertisePage() {
  const skills = [
    { 
      name: "React", 
      level: "Expert", 
      icon_url: "https://cdn.simpleicons.org/react/61DAFB" 
    },
    { 
      name: "TypeScript", 
      level: "Advanced", 
      icon_url: "https://cdn.simpleicons.org/typescript/3178C6" 
    },
    // ... more skills
  ];

  return (
    <div>
      {/* Show the legend */}
      <SkillLegend />

      {/* Display skills */}
      <div className="flex flex-wrap gap-3">
        {skills.map(skill => (
          <SkillFlag
            key={skill.name}
            name={skill.name}
            level={skill.level}
            icon_url={skill.icon_url}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 🔗 Integration with API

### Fetching Skills from Supabase:

```tsx
"use client";

import { useEffect, useState } from "react";
import SkillFlag from "@/components/skill-flag";
import SkillLegend from "@/components/skill-legend";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon_url: string;
}

export default function ExpertisePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills');
        const result = await response.json();
        setSkills(result.data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) return <div>Loading skills...</div>;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div>
      <SkillLegend />

      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {categorySkills.map(skill => (
              <SkillFlag
                key={skill.id}
                name={skill.name}
                level={skill.level}
                icon_url={skill.icon_url}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 Icon Resources

### Recommended Icon Sources:

1. **Simple Icons** (Used in examples)
   - URL: `https://cdn.simpleicons.org/{slug}/{color}`
   - Example: `https://cdn.simpleicons.org/react/61DAFB`
   - Free, no attribution required
   - 2800+ brand icons

2. **Devicon**
   - URL: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg`
   - Example: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg`
   - Developer-focused icons

3. **Custom Icons**
   - Upload to Supabase Storage
   - Use your own SVG/PNG files

---

## 🎨 Customization

### Changing Colors:

Edit `/components/skill-flag.tsx`:

```typescript
const levelColors = {
  Beginner: {
    bg: "rgba(YOUR_COLOR, 0.2)",
    border: "rgba(YOUR_COLOR, 0.5)",
    text: "#YOUR_HEX",
  },
  // ... other levels
};
```

### Changing Sizes:

```tsx
// Small
<SkillFlag name="React" level="Expert" />
// Add custom className
<div className="scale-75">
  <SkillFlag name="React" level="Expert" />
</div>

// Large
<div className="scale-125">
  <SkillFlag name="React" level="Expert" />
</div>
```

### Removing Icons:

Simply don't pass the `icon_url` prop:

```tsx
<SkillFlag name="React" level="Expert" />
```

---

## 📱 Responsive Behavior

- **Mobile**: Skills wrap to multiple lines
- **Tablet**: 2-3 skills per row
- **Desktop**: 4+ skills per row
- **Legend**: Adapts from 1 to 4 columns

---

## ✨ Animation Details

### SkillFlag Animations:
- **Initial**: Fade in + scale from 0.8
- **Hover**: Scale to 1.05 + brighter background
- **Transition**: 0.2s smooth

### SkillLegend Animations:
- **Container**: Fade in + slide up
- **Items**: Staggered fade in (0.1s delay each)

---

## 🚀 Next Steps

1. **Fetch Real Data**: Replace example skills with API data
2. **Add Filtering**: Filter by category or level
3. **Add Search**: Search skills by name
4. **Add Sorting**: Sort by level, name, or category
5. **Add Tooltips**: Show more info on hover
6. **Add Click Actions**: Link to projects using that skill

---

## 💡 Tips

- Keep skill names short (1-2 words)
- Use consistent icon style (all colored or all monochrome)
- Group skills by category for better organization
- Update skill levels regularly as you improve
- Use the legend at the top of your expertise page
