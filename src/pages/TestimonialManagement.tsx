import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { SettingsService } from '@/services/settingsService';
import { ArrowLeft, Plus, Edit, Trash2, Star, Eye, MessageSquare, User } from 'lucide-react';
import type { Testimonial, CreateTestimonialData } from '@/types/settings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function TestimonialManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state for creating/editing testimonials
  const [formData, setFormData] = useState<CreateTestimonialData>({
    clientName: '',
    clientTitle: '',
    clientCompany: '',
    clientImage: '',
    testimonialText: '',
    rating: 5,
    projectId: '',
    featured: false,
    published: true
  });

  // Fetch testimonials
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: () => SettingsService.getTestimonials(true)
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: SettingsService.createTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success('Testimonial created successfully');
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to create testimonial: ${error.message}`);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTestimonialData> }) =>
      SettingsService.updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success('Testimonial updated successfully');
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to update testimonial: ${error.message}`);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: SettingsService.deleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success('Testimonial deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete testimonial: ${error.message}`);
    }
  });

  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: SettingsService.toggleTestimonialFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success('Featured status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update featured status: ${error.message}`);
    }
  });

  // Toggle published mutation
  const togglePublishedMutation = useMutation({
    mutationFn: SettingsService.toggleTestimonialPublished,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success('Published status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update published status: ${error.message}`);
    }
  });

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.testimonialText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientTitle: '',
      clientCompany: '',
      clientImage: '',
      testimonialText: '',
      rating: 5,
      projectId: '',
      featured: false,
      published: true
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      clientName: testimonial.clientName,
      clientTitle: testimonial.clientTitle,
      clientCompany: testimonial.clientCompany,
      clientImage: testimonial.clientImage || '',
      testimonialText: testimonial.testimonialText,
      rating: testimonial.rating || 5,
      projectId: testimonial.projectId || '',
      featured: testimonial.featured,
      published: testimonial.published
    });
    setEditingId(testimonial.id);
    setIsCreating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from ${clientName}?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto\"></div>
          <p className=\"mt-4 text-slate-600 dark:text-slate-400\">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center\">
        <Card className=\"max-w-md w-full\">
          <CardContent className=\"p-6 text-center\">
            <p className=\"text-red-600 dark:text-red-400 mb-4\">Failed to load testimonials</p>
            <p className=\"text-slate-600 dark:text-slate-400\">{error.message}</p>
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
            <div className=\"flex items-center gap-4\">
              <Button
                variant=\"ghost\"
                onClick={() => navigate('/admin')}
                className=\"text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400\"
              >
                <ArrowLeft className=\"mr-2 h-4 w-4\" />
                Back to Admin
              </Button>
              <div>
                <h1 className=\"text-3xl font-bold text-slate-900 dark:text-white\">Testimonial Management</h1>
                <p className=\"text-slate-600 dark:text-slate-400 mt-1\">
                  Manage client testimonials and reviews
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              className=\"bg-blue-600 hover:bg-blue-700 text-white\"
            >
              <Plus className=\"h-4 w-4 mr-2\" />
              New Testimonial
            </Button>
          </div>
        </div>
      </div>

      <div className=\"max-w-7xl mx-auto px-6 py-8\">
        <div className=\"grid lg:grid-cols-3 gap-8\">
          {/* Testimonials List */}
          <div className=\"lg:col-span-2 space-y-6\">
            {/* Stats */}
            <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
              <Card className=\"border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950\">
                <CardContent className=\"p-6\">
                  <div className=\"flex items-center justify-between\">
                    <div>
                      <p className=\"text-sm font-medium text-blue-600 dark:text-blue-400\">Total</p>
                      <p className=\"text-3xl font-bold text-blue-900 dark:text-blue-100\">{testimonials.length}</p>
                    </div>
                    <MessageSquare className=\"h-8 w-8 text-blue-600 dark:text-blue-400\" />
                  </div>
                </CardContent>
              </Card>

              <Card className=\"border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950\">
                <CardContent className=\"p-6\">
                  <div className=\"flex items-center justify-between\">
                    <div>
                      <p className=\"text-sm font-medium text-green-600 dark:text-green-400\">Published</p>
                      <p className=\"text-3xl font-bold text-green-900 dark:text-green-100\">
                        {testimonials.filter(t => t.published).length}
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
                        {testimonials.filter(t => t.featured).length}
                      </p>
                    </div>
                    <Star className=\"h-8 w-8 text-yellow-600 dark:text-yellow-400\" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card>
              <CardContent className=\"p-6\">
                <Input
                  placeholder=\"Search testimonials by client name, company, or content...\"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className=\"max-w-md\"
                />
              </CardContent>
            </Card>

            {/* Testimonials List */}
            <div className=\"space-y-4\">
              {filteredTestimonials.length === 0 ? (
                <Card>
                  <CardContent className=\"p-12 text-center\">
                    <p className=\"text-slate-600 dark:text-slate-400 text-lg\">
                      {searchTerm ? 'No testimonials match your search.' : 'No testimonials found. Create your first testimonial!'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFeatured={(id) => toggleFeaturedMutation.mutate(id)}
                    onTogglePublished={(id) => togglePublishedMutation.mutate(id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Create/Edit Form */}
          {isCreating && (
            <div className=\"lg:col-span-1\">
              <Card className=\"sticky top-8\">
                <CardHeader>
                  <CardTitle className=\"flex items-center gap-2\">
                    <User className=\"h-5 w-5\" />
                    {editingId ? 'Edit Testimonial' : 'New Testimonial'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className=\"space-y-4\">
                    <div className=\"space-y-2\">
                      <Label htmlFor=\"clientName\">Client Name *</Label>
                      <Input
                        id=\"clientName\"
                        value={formData.clientName}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                        placeholder=\"John Doe\"
                        required
                      />
                    </div>

                    <div className=\"space-y-2\">
                      <Label htmlFor=\"clientTitle\">Client Title *</Label>
                      <Input
                        id=\"clientTitle\"
                        value={formData.clientTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientTitle: e.target.value }))}
                        placeholder=\"CEO\"
                        required
                      />
                    </div>

                    <div className=\"space-y-2\">
                      <Label htmlFor=\"clientCompany\">Company *</Label>
                      <Input
                        id=\"clientCompany\"
                        value={formData.clientCompany}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientCompany: e.target.value }))}
                        placeholder=\"Tech Company\"
                        required
                      />
                    </div>

                    <div className=\"space-y-2\">
                      <Label htmlFor=\"clientImage\">Client Image URL</Label>
                      <Input
                        id=\"clientImage\"
                        value={formData.clientImage}
                        onChange={(e) => setFormData(prev => ({ ...prev, clientImage: e.target.value }))}
                        placeholder=\"https://example.com/image.jpg\"
                      />
                    </div>

                    <div className=\"space-y-2\">
                      <Label htmlFor=\"testimonialText\">Testimonial *</Label>
                      <Textarea
                        id=\"testimonialText\"
                        value={formData.testimonialText}
                        onChange={(e) => setFormData(prev => ({ ...prev, testimonialText: e.target.value }))}
                        placeholder=\"Working with [Your Name] was an amazing experience...\"
                        rows={4}
                        required
                      />
                    </div>

                    <div className=\"space-y-2\">
                      <Label htmlFor=\"rating\">Rating</Label>
                      <Input
                        id=\"rating\"
                        type=\"number\"
                        min=\"1\"
                        max=\"5\"
                        value={formData.rating}
                        onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                      />
                    </div>

                    <div className=\"space-y-2\">
                      <Label htmlFor=\"projectId\">Related Project ID</Label>
                      <Input
                        id=\"projectId\"
                        value={formData.projectId}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                        placeholder=\"Optional project ID\"
                      />
                    </div>

                    <div className=\"flex items-center gap-4\">
                      <div className=\"flex items-center space-x-2\">
                        <Switch
                          id=\"featured\"
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                        />
                        <Label htmlFor=\"featured\">Featured</Label>
                      </div>
                      <div className=\"flex items-center space-x-2\">
                        <Switch
                          id=\"published\"
                          checked={formData.published}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                        />
                        <Label htmlFor=\"published\">Published</Label>
                      </div>
                    </div>

                    <div className=\"flex gap-2 pt-4\">
                      <Button
                        type=\"submit\"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className=\"bg-blue-600 hover:bg-blue-700 text-white flex-1\"
                      >
                        {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingId ? 'Update' : 'Create'}
                      </Button>
                      <Button
                        type=\"button\"
                        variant=\"outline\"
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string, clientName: string) => void;
  onToggleFeatured: (id: string) => void;
  onTogglePublished: (id: string) => void;
}

function TestimonialCard({ 
  testimonial, 
  onEdit, 
  onDelete, 
  onToggleFeatured, 
  onTogglePublished 
}: TestimonialCardProps) {
  return (
    <Card className=\"border-0 shadow-lg hover:shadow-xl transition-shadow duration-300\">
      <CardContent className=\"p-6\">
        <div className=\"flex items-start gap-4\">
          {/* Client Image */}
          <div className=\"flex-shrink-0\">
            {testimonial.clientImage ? (
              <img
                src={testimonial.clientImage}
                alt={testimonial.clientName}
                className=\"w-12 h-12 rounded-full object-cover\"
              />
            ) : (
              <div className=\"w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center\">
                <User className=\"h-6 w-6 text-slate-400\" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className=\"flex-1 min-w-0\">
            <div className=\"flex items-start justify-between mb-2\">
              <div>
                <h3 className=\"font-semibold text-slate-900 dark:text-white\">{testimonial.clientName}</h3>
                <p className=\"text-sm text-slate-600 dark:text-slate-400\">
                  {testimonial.clientTitle} at {testimonial.clientCompany}
                </p>
              </div>
              <div className=\"flex items-center gap-2 ml-4\">
                <Badge 
                  variant={testimonial.published ? 'default' : 'secondary'}
                  className={testimonial.published 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                  }
                >
                  {testimonial.published ? 'Published' : 'Draft'}
                </Badge>
                {testimonial.featured && (
                  <Badge className=\"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200\">
                    <Star className=\"h-3 w-3 mr-1\" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            <p className=\"text-slate-600 dark:text-slate-300 mb-4 line-clamp-3\">
              \"{testimonial.testimonialText}\"
            </p>

            {testimonial.rating && (
              <div className=\"flex items-center mb-4\">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating! 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
                <span className=\"ml-2 text-sm text-slate-600 dark:text-slate-400\">
                  {testimonial.rating}/5
                </span>
              </div>
            )}

            {/* Actions */}
            <div className=\"flex items-center gap-2\">
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onEdit(testimonial)}
                className=\"border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950\"
              >
                <Edit className=\"h-4 w-4 mr-2\" />
                Edit
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onToggleFeatured(testimonial.id)}
                className={testimonial.featured 
                  ? 'border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 dark:border-yellow-800 dark:text-yellow-300 dark:bg-yellow-950 dark:hover:bg-yellow-900' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
                }
              >
                <Star className={`h-4 w-4 mr-2 ${testimonial.featured ? 'fill-current' : ''}`} />
                {testimonial.featured ? 'Featured' : 'Feature'}
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onTogglePublished(testimonial.id)}
                className={testimonial.published 
                  ? 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100 dark:border-green-800 dark:text-green-300 dark:bg-green-950 dark:hover:bg-green-900' 
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
                }
              >
                {testimonial.published ? 'Unpublish' : 'Publish'}
              </Button>
              
              <Button
                size=\"sm\"
                variant=\"outline\"
                onClick={() => onDelete(testimonial.id, testimonial.clientName)}
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