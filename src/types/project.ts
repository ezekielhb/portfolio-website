export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  hero_image: string;
  image: string;
  images: string[];
  tags: string[];
  category: string;
  featured: boolean;
  overview: string;
  problem: string;
  process: string[];
  solution: string;
  results: string[];
  duration: string;
  team: string;
  impact: string;
  live_url?: string;
  github_url?: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface CreateProjectData {
  title: string;
  subtitle?: string;
  description: string;
  hero_image: string;
  image: string;
  images: string[];
  tags: string[];
  category: string;
  featured: boolean;
  overview: string;
  problem: string;
  process: string[];
  solution: string;
  results: string[];
  duration: string;
  team: string;
  impact: string;
  live_url?: string;
  github_url?: string;
  published: boolean;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}