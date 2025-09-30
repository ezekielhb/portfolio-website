export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  heroImage: string;
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
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export interface CreateProjectData {
  title: string;
  subtitle?: string;
  description: string;
  heroImage: string;
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
  liveUrl?: string;
  githubUrl?: string;
  published: boolean;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}