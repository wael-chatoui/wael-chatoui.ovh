# Skills Linking & Management Guide

## 🎯 Overview

This guide covers the new features for skill management, linking, and display.

---

## ✨ New Features

### 1. **Clickable Skills with Links**
Skills can now link to their GitHub repositories or documentation.

### 2. **Dedicated Skills Page**
All skills moved to `/skills` with organized categories.

### 3. **Skill Linking in Admin**
Link skills to projects, hackathons, and experiences through the admin panel.

---

## 📄 Pages

### `/skills` - Skills List Page
- **Purpose**: Display all skills organized by category
- **Features**:
  - Color-coded by mastery level
  - Clickable skills (link to GitHub/docs)
  - Category icons (🎨 Frontend, ⚙️ Backend, etc.)
  - Skill legend at top
  - Staggered animations

### `/expertise` - Expertise Overview
- **Purpose**: Main expertise page with overview
- **Features**:
  - Introduction text
  - Button linking to `/skills` page
  - Space for hackathons, projects, experiences

---

## 🔗 Skill Links Feature

### Database Schema Update

Add `link` column to `skills` table:

```sql
ALTER TABLE skills ADD COLUMN link TEXT;
```

### Admin Form

The skills admin form (`/admin/skills`) now includes:
- **GitHub/Documentation Link** field
- Stores URL to skill's repository or documentation
- Optional field

### Usage Example

```typescript
// Skill with link
{
  name: "React",
  level: "Expert",
  icon_url: "https://cdn.simpleicons.org/react/61DAFB",
  link: "https://github.com/facebook/react"  // ← New field
}
```

### SkillFlag Component

Updated to support clickable links:

```tsx
<SkillFlag
  name="React"
  level="Expert"
  icon_url="https://..."
  link="https://github.com/facebook/react"  // Makes it clickable
/>
```

**Behavior**:
- If `link` provided → Clickable, opens in new tab
- If no `link` → Static badge

---

## 🔗 Linking Skills to Projects

### SkillSelector Component

**Location**: `/components/skill-selector.tsx`

**Features**:
- Search skills by name or category
- Checkbox selection
- Shows skill level
- Real-time filtering
- Displays selected count

**Usage in Admin Forms**:

```tsx
import SkillSelector from "@/components/skill-selector";

const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

<SkillSelector
  selectedSkills={selectedSkills}
  onChange={setSelectedSkills}
/>
```

### Projects Admin Form

**Updated**: `/admin/projects`

Now includes:
- **Related Skills** section
- SkillSelector component
- Saves skill IDs for linking

### Database Junction Tables

Skills are linked via junction tables:

```sql
-- Link skills to projects
CREATE TABLE project_skills (
  project_id INT REFERENCES side_projects(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

-- Link skills to hackathons
CREATE TABLE hackathon_skills (
  hackathon_id INT REFERENCES hackathons(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (hackathon_id, skill_id)
);

-- Link skills to experiences
CREATE TABLE experience_skills (
  experience_id INT REFERENCES professional_experiences(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (experience_id, skill_id)
);
```

---

## 📊 Implementation Status

### ✅ Completed

- [x] Skill links in database schema
- [x] Skill links in admin form
- [x] Skill links in API
- [x] SkillFlag component with clickable links
- [x] Dedicated `/skills` page
- [x] Button in `/expertise` linking to skills
- [x] SkillSelector component
- [x] Skill linking in Projects admin form

### 🚧 To Implement

- [ ] Save skill links to junction tables in API
- [ ] Add SkillSelector to Hackathons admin form
- [ ] Add SkillSelector to Experiences admin form
- [ ] Display linked skills on project cards
- [ ] Display linked skills on hackathon cards
- [ ] Display linked skills on experience cards
- [ ] Filter projects/hackathons by skill
- [ ] Skill statistics (most used, etc.)

---

## 🔧 API Updates

### POST `/api/skills`

Now accepts `link` field:

```json
{
  "name": "React",
  "category": "Frontend",
  "level": "Expert",
  "icon_url": "https://...",
  "link": "https://github.com/facebook/react"  // ← New
}
```

### Saving Skill Links (To Implement)

When creating a project with skills:

```typescript
// 1. Create the project
const { data: project } = await supabase
  .from('side_projects')
  .insert([projectData])
  .select()
  .single();

// 2. Link skills to project
const skillLinks = selectedSkills.map(skillId => ({
  project_id: project.id,
  skill_id: skillId
}));

await supabase
  .from('project_skills')
  .insert(skillLinks);
```

---

## 🎨 UI/UX

### Skills Page Layout

```
┌─────────────────────────────────────┐
│         My Skills (Title)           │
├─────────────────────────────────────┤
│      Skill Legend (Color Guide)     │
├─────────────────────────────────────┤
│  🎨 Frontend                        │
│  [React] [Next.js] [TypeScript]...  │
├─────────────────────────────────────┤
│  ⚙️ Backend                         │
│  [Node.js] [Python] [Express]...    │
├─────────────────────────────────────┤
│  ... (more categories)              │
└─────────────────────────────────────┘
```

### Expertise Page Layout

```
┌─────────────────────────────────────┐
│      My Expertise (Title)           │
├─────────────────────────────────────┤
│    Introduction Text                │
├─────────────────────────────────────┤
│  [📋 See a raw list of my skills]   │
│         (Button)                    │
├─────────────────────────────────────┤
│  (Space for projects, hackathons)   │
└─────────────────────────────────────┘
```

### SkillSelector in Admin

```
┌─────────────────────────────────────┐
│  Related Skills                     │
├─────────────────────────────────────┤
│  Search: [____________]             │
├─────────────────────────────────────┤
│  ☑ React (Frontend) - Expert       │
│  ☐ Vue.js (Frontend) - Intermediate│
│  ☑ Node.js (Backend) - Advanced    │
│  ...                                │
├─────────────────────────────────────┤
│  2 skills selected                  │
└─────────────────────────────────────┘
```

---

## 💡 Usage Tips

### Adding Skill Links

1. Go to `/admin/skills`
2. Fill in skill details
3. Add GitHub repo or documentation URL in "GitHub/Documentation Link"
4. Save

### Linking Skills to Projects

1. Go to `/admin/projects`
2. Fill in project details
3. Scroll to "Related Skills" section
4. Search and select relevant skills
5. Save (Note: Junction table saving needs to be implemented in API)

### Viewing Skills

- **Full List**: Visit `/skills`
- **From Expertise**: Click "See a raw list of my skills" button on `/expertise`
- **Click Skills**: Click any skill with a link to visit its GitHub/docs

---

## 🚀 Next Steps

### 1. Complete API Integration

Update project/hackathon/experience APIs to save skill links:

```typescript
// In /api/projects/route.ts
// After creating project, insert into project_skills table
```

### 2. Add to Other Admin Forms

Copy SkillSelector implementation to:
- `/admin/hackathons`
- `/admin/experiences`

### 3. Display Linked Skills

Show skills on project/hackathon/experience cards:

```tsx
<ProjectCard>
  <h3>{project.name}</h3>
  <div className="skills">
    {project.skills.map(skill => (
      <SkillFlag key={skill.id} {...skill} />
    ))}
  </div>
</ProjectCard>
```

### 4. Add Filtering

Filter projects by skill:
```
/projects?skill=react
```

---

## 📝 Notes

- Skill links are optional
- Skills without links are still clickable but don't navigate
- SkillSelector fetches skills from API in real-time
- Search is case-insensitive
- Multiple skills can be selected per project/hackathon/experience
- Junction tables use CASCADE DELETE for automatic cleanup

---

## 🐛 Troubleshooting

**Skills not showing in selector?**
- Make sure skills are added via `/admin/skills` first
- Check API is returning skills: `GET /api/skills`

**Links not working?**
- Verify `link` field is saved in database
- Check link format includes `https://`
- Ensure SkillFlag component receives `link` prop

**Selected skills not saving?**
- Junction table API integration needs to be implemented
- Check browser console for errors
- Verify Supabase permissions for junction tables
