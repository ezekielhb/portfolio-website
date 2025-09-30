import { supabase, PROJECTS_TABLE } from '@/lib/supabase';
import type { Project, CreateProjectData, UpdateProjectData } from '@/types/project';

export class ProjectService {
  // Get all projects (published only for public view)
  static async getProjects(includeUnpublished: boolean = false): Promise<Project[]> {
    let query = supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }

    return data || [];
  }

  // Get featured projects
  static async getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch featured projects: ${error.message}`);
    }

    return data || [];
  }

  // Get single project by ID
  static async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Project not found
      }
      throw new Error(`Failed to fetch project: ${error.message}`);
    }

    return data;
  }

  // Get project by ID (including unpublished, for admin)
  static async getProjectByIdAdmin(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch project: ${error.message}`);
    }

    return data;
  }

  // Create new project
  static async createProject(projectData: CreateProjectData): Promise<Project> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const project = {
      id,
      ...projectData,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .insert(project)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }

    return data;
  }

  // Update project
  static async updateProject(projectData: UpdateProjectData): Promise<Project> {
    const { id, ...updateData } = projectData;
    const updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .update({ ...updateData, updated_at })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update project: ${error.message}`);
    }

    return data;
  }

  // Delete project
  static async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from(PROJECTS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Project> {
    // First get the current project
    const project = await this.getProjectByIdAdmin(id);
    if (!project) {
      throw new Error('Project not found');
    }

    // Toggle the featured status
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .update({ 
        featured: !project.featured,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to toggle featured status: ${error.message}`);
    }

    return data;
  }

  // Toggle published status
  static async togglePublished(id: string): Promise<Project> {
    const project = await this.getProjectByIdAdmin(id);
    if (!project) {
      throw new Error('Project not found');
    }

    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .update({ 
        published: !project.published,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to toggle published status: ${error.message}`);
    }

    return data;
  }
}