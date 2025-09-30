import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProjectService } from '@/services/projectService';
import { Plus, Edit, Trash2, Eye, Star, Globe, Lock, User, MessageSquare, Settings } from 'lucide-react';
import type { Project } from '@/types/project';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all projects (including unpublished)
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => ProjectService.getProjects(true)
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: ProjectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    }
  });

  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: ProjectService.toggleFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Featured status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update featured status: ${error.message}`);
    }
  });

  // Toggle published mutation
  const togglePublishedMutation = useMutation({
    mutationFn: ProjectService.togglePublished,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Published status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update published status: ${error.message}`);
    }
  });

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto\"></div>
          <p className=\"mt-4 text-slate-600 dark:text-slate-400\">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const isEnvError = error.message.includes('Missing Supabase environment variables');
    return (
      <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center\">
        <Card className=\"max-w-lg w-full\">
          <CardContent className=\"p-6 text-center\">
            <p className=\"text-red-600 dark:text-red-400 mb-4 font-semibold\">Failed to load projects</p>
            <p className=\"text-slate-600 dark:text-slate-400 mb-6\">{error.message}</p>
            {isEnvError && (
              <div className=\"text-left space-y-3\">
                <p className=\"font-semibold text-slate-800 dark:text-slate-200\">Setup Required:</p>
                <ol className=\"list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400\">
                  <li>Create a Supabase account and project</li>
                  <li>Run the database-schema.sql in Supabase SQL Editor</li>
                  <li>Update .env.local with your Supabase credentials</li>
                  <li>Restart the development server</li>
                </ol>
                <div className=\"flex gap-2 justify-center mt-4\">
                  <Button onClick={() => navigate('/')} variant=\"outline\">
                    Back to Home
                  </Button>
                  <Button onClick={() => navigate('/admin/test')} className=\"bg-blue-600 hover:bg-blue-700 text-white\">
                    Test Route
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900\">
      {/* Header */}
      <div className=\"border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900\">
        <div className=\"max-w-7xl mx-auto px-6 py-6\">
          <div className=\"flex items-center justify-between\">
            <div>
              <h1 className=\"text-3xl font-bold text-slate-900 dark:text-white\">Project Admin</h1>
              <p className=\"text-slate-600 dark:text-slate-400 mt-1\">
                Manage your portfolio projects
              </p>
            </div>
            <div className=\"flex items-center gap-4\">
              <Button
                onClick={() => navigate('/')}
                variant=\"outline\"
                className=\"border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800\"
              >
                <Eye className=\"h-4 w-4 mr-2\" />
                View Site
              </Button>
              <Button
                onClick={() => navigate('/admin/project/new')}
                className=\"bg-blue-600 hover:bg-blue-700 text-white\"
              >
                <Plus className=\"h-4 w-4 mr-2\" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=\"max-w-7xl mx-auto px-6 py-8\">
        {/* Management Menu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={() => navigate('/admin/profile')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Settings</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage your personal information</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={() => navigate('/admin/testimonials')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Testimonials</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage client testimonials</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" onClick={() => navigate('/admin/contact')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contact Settings</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Update contact information</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className=\"border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950\">
            <CardContent className=\"p-6\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-blue-600 dark:text-blue-400\">Total Projects</p>
                  <p className=\"text-3xl font-bold text-blue-900 dark:text-blue-100\">{projects.length}</p>
                </div>
                <Globe className=\"h-8 w-8 text-blue-600 dark:text-blue-400\" />
              </div>
            </CardContent>
          </Card>

          <Card className=\"border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950\">
            <CardContent className=\"p-6\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-green-600 dark:text-green-400\">Published</p>
                  <p className=\"text-3xl font-bold text-green-900 dark:text-green-100\">
                    {projects.filter(p => p.published).length}
                  </p>
                </div>
                <Eye className=\"h-8 w-8 text-green-600 dark:text-green-400\" />
              </div>
            </CardContent>
          </Card>

          <Card className=\"border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950\">
            <CardContent className=\"p-6\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-yellow-600 dark:text-yellow-400\">Featured</p>
                  <p className=\"text-3xl font-bold text-yellow-900 dark:text-yellow-100\">
                    {projects.filter(p => p.featured).length}
                  </p>
                </div>
                <Star className=\"h-8 w-8 text-yellow-600 dark:text-yellow-400\" />
              </div>
            </CardContent>
          </Card>

          <Card className=\"border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950\">
            <CardContent className=\"p-6\">
              <div className=\"flex items-center justify-between\">
                <div>
                  <p className=\"text-sm font-medium text-slate-600 dark:text-slate-400\">Drafts</p>
                  <p className=\"text-3xl font-bold text-slate-900 dark:text-slate-100\">
                    {projects.filter(p => !p.published).length}
                  </p>
                </div>
                <Lock className=\"h-8 w-8 text-slate-600 dark:text-slate-400\" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className=\"mb-8\">
          <CardContent className=\"p-6\">
            <Input
              placeholder="Search projects by title, category, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className=\"space-y-6\">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className=\"p-12 text-center\">
                <p className=\"text-slate-600 dark:text-slate-400 text-lg\">
                  {searchTerm ? 'No projects match your search.' : 'No projects found. Create your first project!'}
                </p>
                {!searchTerm && (
                  <Button 
                    onClick={() => navigate('/admin/project/new')}
                    className=\"mt-4 bg-blue-600 hover:bg-blue-700 text-white\"
                  >
                    <Plus className=\"h-4 w-4 mr-2\" />
                    Create Project
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={(id) => navigate(`/admin/project/edit/${id}`)}
                onDelete={handleDelete}
                onToggleFeatured={(id) => toggleFeaturedMutation.mutate(id)}
                onTogglePublished={(id) => togglePublishedMutation.mutate(id)}
                onPreview={(id) => navigate(`/case-study/${id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onToggleFeatured: (id: string) => void;
  onTogglePublished: (id: string) => void;
  onPreview: (id: string) => void;
}

function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onToggleFeatured, 
  onTogglePublished,
  onPreview 
}: ProjectCardProps) {
  return (
    <Card className=\"border-0 shadow-lg hover:shadow-xl transition-shadow duration-300\">
      <CardContent className=\"p-6\">
        <div className=\"flex items-start gap-6\">
          {/* Project Image */}
          <div className=\"relative flex-shrink-0\">
            <img
              src={project.image}
              alt={project.title}
              className=\"w-32 h-24 object-cover rounded-lg\"
            />
            {project.featured && (
              <Badge className=\"absolute -top-2 -right-2 bg-yellow-500 text-yellow-50\">
                <Star className=\"h-3 w-3\" />
              </Badge>
            )}
          </div>

          {/* Project Info */}
          <div className=\"flex-1 min-w-0\">
            <div className=\"flex items-start justify-between mb-3\">
              <div>
                <h3 className=\"text-xl font-semibold text-slate-900 dark:text-white mb-1\">
                  {project.title}
                </h3>
                <p className=\"text-slate-600 dark:text-slate-400 line-clamp-2\">
                  {project.description}
                </p>
              </div>
              
              <div className=\"flex items-center gap-2 ml-4\">
                <Badge 
                  variant={project.published ? 'default' : 'secondary'}
                  className={project.published 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                  }
                >
                  {project.published ? 'Published' : 'Draft'}
                </Badge>
                <Badge variant=\"outline\" className=\"border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300\">
                  {project.category}
                </Badge>
              </div>
            </div>

            {/* Tags */}
            <div className=\"flex flex-wrap gap-2 mb-4\">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant=\"secondary\" className=\"text-xs\">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant=\"secondary\" className=\"text-xs\">
                  +{project.tags.length - 4} more
                </Badge>
              )}
            </div>

            {/* Metadata */}
            <div className=\"flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-4\">
              <span>Duration: {project.duration}</span>
              <span>Team: {project.team}</span>
              <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            <div className=\"flex items-center gap-2\">
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onEdit(project.id)}
                className=\"border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950\"
              >
                <Edit className=\"h-4 w-4 mr-2\" />
                Edit
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onPreview(project.id)}
                className=\"border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950\"
              >
                <Eye className=\"h-4 w-4 mr-2\" />
                Preview
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onToggleFeatured(project.id)}
                className={project.featured 
                  ? 'border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 dark:border-yellow-800 dark:text-yellow-300 dark:bg-yellow-950 dark:hover:bg-yellow-900' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
                }
              >
                <Star className={`h-4 w-4 mr-2 ${project.featured ? 'fill-current' : ''}`} />
                {project.featured ? 'Featured' : 'Feature'}
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onTogglePublished(project.id)}
                className={project.published 
                  ? 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100 dark:border-green-800 dark:text-green-300 dark:bg-green-950 dark:hover:bg-green-900' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
                }
              >
                {project.published ? 'Unpublish' : 'Publish'}
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onDelete(project.id, project.title)}
                className=\"border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950\"
              >
                <Trash2 className=\"h-4 w-4 mr-2\" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}