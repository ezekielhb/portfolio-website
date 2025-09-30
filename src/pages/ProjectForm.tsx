import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ProjectService } from '@/services/projectService';
import { ArrowLeft, Plus, X, Save, Eye } from 'lucide-react';
import type { CreateProjectData, UpdateProjectData } from '@/types/project';
import { toast } from 'sonner';

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = id !== 'new';

  // Form state
  const [formData, setFormData] = useState<CreateProjectData>({
    title: '',
    subtitle: '',
    description: '',
    hero_image: '',
    image: '',
    images: [],
    tags: [],
    category: '',
    featured: false,
    overview: '',
    problem: '',
    process: [],
    solution: '',
    results: [],
    duration: '',
    team: '',
    impact: '',
    live_url: '',
    github_url: '',
    published: false
  });

  // Temporary state for adding items
  const [newTag, setNewTag] = useState('');
  const [newProcessStep, setNewProcessStep] = useState('');
  const [newResult, setNewResult] = useState('');
  const [newImage, setNewImage] = useState('');

  // Fetch project for editing
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => ProjectService.getProjectByIdAdmin(id!),
    enabled: isEditing
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: ProjectService.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project created successfully');
      navigate('/admin');
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ProjectService.updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      toast.success('Project updated successfully');
      navigate('/admin');
    },
    onError: (error) => {
      toast.error(`Failed to update project: ${error.message}`);
    }
  });

  // Load project data for editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        subtitle: project.subtitle || '',
        description: project.description,
        hero_image: project.hero_image,
        image: project.image,
        images: project.images,
        tags: project.tags,
        category: project.category,
        featured: project.featured,
        overview: project.overview,
        problem: project.problem,
        process: project.process,
        solution: project.solution,
        results: project.results,
        duration: project.duration,
        team: project.team,
        impact: project.impact,
        live_url: project.live_url || '',
        github_url: project.github_url || '',
        published: project.published
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateMutation.mutate({ id: id!, ...formData } as UpdateProjectData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: keyof CreateProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const addProcessStep = () => {
    if (newProcessStep.trim()) {
      handleInputChange('process', [...formData.process, newProcessStep.trim()]);
      setNewProcessStep('');
    }
  };

  const removeProcessStep = (index: number) => {
    handleInputChange('process', formData.process.filter((_, i) => i !== index));
  };

  const addResult = () => {
    if (newResult.trim()) {
      handleInputChange('results', [...formData.results, newResult.trim()]);
      setNewResult('');
    }
  };

  const removeResult = (index: number) => {
    handleInputChange('results', formData.results.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      handleInputChange('images', [...formData.images, newImage.trim()]);
      setNewImage('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    handleInputChange('images', formData.images.filter(img => img !== imageToRemove));
  };

  const handlePreview = () => {
    if (isEditing && id) {
      navigate(`/case-study/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>

          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {isEditing ? 'Edit Project' : 'New Project'}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {isEditing ? 'Update your project details' : 'Create a new portfolio project'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-950"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              )}
              <Button
                type="submit"
                form="project-form"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Project'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form id="project-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Project subtitle (optional)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief project description for portfolio grid"
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Web App, Mobile App, SaaS"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 3 months"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="team">Team *</Label>
                  <Input
                    id="team"
                    value={formData.team}
                    onChange={(e) => handleInputChange('team', e.target.value)}
                    placeholder="e.g., 1 Designer, 2 Developers, 1 PM"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="impact">Key Impact *</Label>
                  <Input
                    id="impact"
                    value={formData.impact}
                    onChange={(e) => handleInputChange('impact', e.target.value)}
                    placeholder="e.g., 45% increase in user engagement"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => handleInputChange('published', checked)}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">
                Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Portfolio Grid Image *</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="URL for portfolio grid thumbnail"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroImage">Hero Image *</Label>
                  <Input
                    id="heroImage"
                    value={formData.hero_image}
                    onChange={(e) => handleInputChange('hero_image', e.target.value)}
                    placeholder="URL for case study hero image"
                    required
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div className="space-y-4">
                <Label>Gallery Images</Label>
                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Add gallery image URL"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  />
                  <Button type="button" onClick={addImage} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1">
                      <span className="text-sm truncate max-w-32">{image}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(image)}
                        className="h-4 w-4 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(tag)}
                      className="h-4 w-4 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Study Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">
                Case Study Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="overview">Overview *</Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) => handleInputChange('overview', e.target.value)}
                  placeholder="Project overview and context"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="problem">Problem Statement *</Label>
                <Textarea
                  id="problem"
                  value={formData.problem}
                  onChange={(e) => handleInputChange('problem', e.target.value)}
                  placeholder="The problem this project solves"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solution *</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => handleInputChange('solution', e.target.value)}
                  placeholder="How you solved the problem"
                  rows={4}
                  required
                />
              </div>

              {/* Design Process */}
              <div className="space-y-4">
                <Label>Design Process</Label>
                <div className="flex gap-2">
                  <Input
                    value={newProcessStep}
                    onChange={(e) => setNewProcessStep(e.target.value)}
                    placeholder="Add process step"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProcessStep())}
                  />
                  <Button type="button" onClick={addProcessStep} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.process.map((step, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="flex-1">{step}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProcessStep(index)}
                        className="hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <Label>Results & Impact</Label>
                <div className="flex gap-2">
                  <Input
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value)}
                    placeholder="Add a result or impact metric"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                  />
                  <Button type="button" onClick={addResult} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {formData.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded">
                      <span className="flex-1 text-sm">{result}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeResult(index)}
                        className="hover:bg-red-100 dark:hover:bg-red-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">
                Project Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.live_url}
                    onChange={(e) => handleInputChange('live_url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.github_url}
                    onChange={(e) => handleInputChange('github_url', e.target.value)}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}