import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SettingsService } from '@/services/settingsService';
import { ArrowLeft, Save, User, Plus, X, Upload, Globe, Phone, Mail, MapPin, FileText, Star } from 'lucide-react';
import type { CreateProfileData } from '@/types/settings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState<CreateProfileData>({
    name: '',
    title: '',
    bio: '',
    profileImage: '',
    heroImage: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    resume: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      dribbble: '',
      behance: '',
      instagram: ''
    },
    skills: [],
    experience: '',
    availability: ''
  });

  const [newSkill, setNewSkill] = useState('');

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: SettingsService.getProfile
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateProfileData>) => 
      profile ? SettingsService.updateProfile(data) : SettingsService.createProfile(data as CreateProfileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(profile ? 'Profile updated successfully' : 'Profile created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    }
  });

  // Load profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        title: profile.title,
        bio: profile.bio,
        profileImage: profile.profileImage,
        heroImage: profile.heroImage || '',
        location: profile.location || '',
        email: profile.email,
        phone: profile.phone || '',
        website: profile.website || '',
        resume: profile.resume || '',
        socialLinks: profile.socialLinks,
        skills: profile.skills,
        experience: profile.experience,
        availability: profile.availability
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof CreateProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      handleInputChange('skills', [...formData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange('skills', formData.skills.filter(skill => skill !== skillToRemove));
  };

  if (isLoading) {
    return (
      <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto\"></div>
          <p className=\"mt-4 text-slate-600 dark:text-slate-400\">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-slate-50 dark:bg-slate-900\">
      {/* Header */}
      <div className=\"border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900\">
        <div className=\"max-w-4xl mx-auto px-6 py-6\">
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
                <h1 className=\"text-3xl font-bold text-slate-900 dark:text-white\">Profile Settings</h1>
                <p className=\"text-slate-600 dark:text-slate-400 mt-1\">
                  Manage your personal information and public profile
                </p>
              </div>
            </div>
            <Button
              type=\"submit\"
              form=\"profile-form\"
              disabled={updateMutation.isPending}
              className=\"bg-blue-600 hover:bg-blue-700 text-white\"
            >
              <Save className=\"h-4 w-4 mr-2\" />
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className=\"max-w-4xl mx-auto px-6 py-8\">
        <form id=\"profile-form\" onSubmit={handleSubmit} className=\"space-y-8\">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2 text-xl text-slate-900 dark:text-white\">
                <User className=\"h-5 w-5\" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-6\">
              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"name\">Full Name *</Label>
                  <Input
                    id=\"name\"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder=\"Your full name\"
                    required
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"title\">Professional Title *</Label>
                  <Input
                    id=\"title\"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder=\"e.g., UI/UX Designer\"
                    required
                  />
                </div>
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"bio\">Bio *</Label>
                <Textarea
                  id=\"bio\"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder=\"Tell visitors about yourself...\"
                  rows={4}
                  required
                />
              </div>

              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"experience\">Years of Experience *</Label>
                  <Input
                    id=\"experience\"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder=\"e.g., 5+ years\"
                    required
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"availability\">Availability *</Label>
                  <Input
                    id=\"availability\"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    placeholder=\"e.g., Available for new projects\"
                    required
                  />
                </div>
              </div>

              <div className=\"space-y-2\">
                <Label htmlFor=\"location\">Location</Label>
                <Input
                  id=\"location\"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder=\"City, Country\"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2 text-xl text-slate-900 dark:text-white\">
                <Upload className=\"h-5 w-5\" />
                Profile Images
              </CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-6\">
              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"profileImage\">Profile Image *</Label>
                  <Input
                    id=\"profileImage\"
                    value={formData.profileImage}
                    onChange={(e) => handleInputChange('profileImage', e.target.value)}
                    placeholder=\"Profile image URL\"
                    required
                  />
                  <p className=\"text-sm text-slate-500 dark:text-slate-400\">
                    This image will appear in the About section
                  </p>
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"heroImage\">Hero Background Image</Label>
                  <Input
                    id=\"heroImage\"
                    value={formData.heroImage}
                    onChange={(e) => handleInputChange('heroImage', e.target.value)}
                    placeholder=\"Hero section background URL\"
                  />
                  <p className=\"text-sm text-slate-500 dark:text-slate-400\">
                    Optional background for hero section
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {formData.profileImage && (
                <div className=\"space-y-2\">
                  <Label>Profile Image Preview</Label>
                  <div className=\"w-32 h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700\">
                    <img
                      src={formData.profileImage}
                      alt=\"Profile preview\"
                      className=\"w-full h-full object-cover\"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2 text-xl text-slate-900 dark:text-white\">
                <Mail className=\"h-5 w-5\" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-6\">
              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"email\">Email *</Label>
                  <Input
                    id=\"email\"
                    type=\"email\"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder=\"your@email.com\"
                    required
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"phone\">Phone</Label>
                  <Input
                    id=\"phone\"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder=\"+1 (555) 123-4567\"
                  />
                </div>
              </div>

              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"website\">Website</Label>
                  <Input
                    id=\"website\"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder=\"https://yourwebsite.com\"
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"resume\">Resume URL</Label>
                  <Input
                    id=\"resume\"
                    value={formData.resume}
                    onChange={(e) => handleInputChange('resume', e.target.value)}
                    placeholder=\"Link to your resume/CV\"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2 text-xl text-slate-900 dark:text-white\">
                <Globe className=\"h-5 w-5\" />
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-6\">
              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"linkedin\">LinkedIn</Label>
                  <Input
                    id=\"linkedin\"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    placeholder=\"https://linkedin.com/in/yourprofile\"
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"github\">GitHub</Label>
                  <Input
                    id=\"github\"
                    value={formData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    placeholder=\"https://github.com/yourusername\"
                  />
                </div>
              </div>

              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"twitter\">Twitter</Label>
                  <Input
                    id=\"twitter\"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    placeholder=\"https://twitter.com/yourusername\"
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"dribbble\">Dribbble</Label>
                  <Input
                    id=\"dribbble\"
                    value={formData.socialLinks.dribbble}
                    onChange={(e) => handleSocialLinkChange('dribbble', e.target.value)}
                    placeholder=\"https://dribbble.com/yourusername\"
                  />
                </div>
              </div>

              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"space-y-2\">
                  <Label htmlFor=\"behance\">Behance</Label>
                  <Input
                    id=\"behance\"
                    value={formData.socialLinks.behance}
                    onChange={(e) => handleSocialLinkChange('behance', e.target.value)}
                    placeholder=\"https://behance.net/yourusername\"
                  />
                </div>
                <div className=\"space-y-2\">
                  <Label htmlFor=\"instagram\">Instagram</Label>
                  <Input
                    id=\"instagram\"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    placeholder=\"https://instagram.com/yourusername\"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2 text-xl text-slate-900 dark:text-white\">
                <Star className=\"h-5 w-5\" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-4\">
              <div className=\"flex gap-2\">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder=\"Add a skill\"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type=\"button\" onClick={addSkill} variant=\"outline\">
                  <Plus className=\"h-4 w-4\" />
                </Button>
              </div>
              <div className=\"flex flex-wrap gap-2\">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant=\"secondary\" className=\"flex items-center gap-1\">
                    {skill}
                    <Button
                      type=\"button\"
                      variant=\"ghost\"
                      size=\"sm\"
                      onClick={() => removeSkill(skill)}
                      className=\"h-4 w-4 p-0 hover:bg-red-100 dark:hover:bg-red-900\"
                    >
                      <X className=\"h-3 w-3\" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}