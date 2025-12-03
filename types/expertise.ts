export type Category = 'experiences' | 'projects' | 'hackathons';

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  icon_url?: string;
  link?: string;
}

export interface Experience {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  location: string;
  description: string;
  image_url?: string;
  website?: string;
  github_link?: string;
  skills?: Skill[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  github_link: string;
  live_link: string;
  image_url?: string;
  featured: boolean;
  skills?: Skill[];
}

export interface Hackathon {
  id: number;
  name: string;
  organized_by: string;
  start_date: string;
  end_date: string;
  location: string;
  description?: string;
  image_url?: string;
  github_link?: string;
  project_link?: string;
  role: string;
  team_size?: number;
  skills?: Skill[];
}

export interface CategoryConfig {
  id: Category;
  label: string;
  icon: string; // Iconify icon id used across the expertise tabs
  count: number;
}
