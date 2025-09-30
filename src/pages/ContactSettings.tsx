import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { SettingsService } from '@/services/settingsService';
import { ArrowLeft, Save, Mail, Phone, MapPin, Globe, MessageSquare } from 'lucide-react';
import type { CreateContactData } from '@/types/settings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ContactSettings() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState<CreateContactData>({
    email: '',
    phone: '',
    address: '',
    social_links: {
      linkedin: '',
      github: '',
      twitter: '',
      dribbble: '',
      behance: '',
      instagram: ''
    },
    contact_form_webhook: '',
    auto_reply_enabled: false,
    auto_reply_message: ''
  });

  // Fetch contact settings
  const { data: contactSettings, isLoading } = useQuery({
    queryKey: ['contact-settings'],
    queryFn: SettingsService.getContactSettings
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateContactData>) => 
      contactSettings 
        ? SettingsService.updateContactSettings(data) 
        : SettingsService.createContactSettings(data as CreateContactData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-settings'] });
      toast.success(contactSettings ? 'Contact settings updated successfully' : 'Contact settings created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to save contact settings: ${error.message}`);
    }
  });

  // Load contact settings data
  useEffect(() => {
    if (contactSettings) {
      setFormData({
        email: contactSettings.email,
        phone: contactSettings.phone || '',
        address: contactSettings.address || '',
        social_links: contactSettings.social_links,
        contact_form_webhook: contactSettings.contact_form_webhook || '',
        auto_reply_enabled: contactSettings.auto_reply_enabled,
        auto_reply_message: contactSettings.auto_reply_message || ''
      });
    }
  }, [contactSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof CreateContactData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading contact settings...</p>
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Settings</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Manage your contact information and form settings
                </p>
              </div>
            </div>
            <Button
              type="submit"
              form="contact-form"
              disabled={updateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Primary email for contact forms and inquiries
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Optional phone number for display
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="City, State, Country"
                  rows={3}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your location or business address
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
                <Globe className="h-5 w-5" />
                Social Media Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.social_links.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.social_links.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.social_links.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dribbble">Dribbble</Label>
                  <Input
                    id="dribbble"
                    value={formData.social_links.dribbble}
                    onChange={(e) => handleSocialLinkChange('dribbble', e.target.value)}
                    placeholder="https://dribbble.com/yourusername"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="behance">Behance</Label>
                  <Input
                    id="behance"
                    value={formData.social_links.behance}
                    onChange={(e) => handleSocialLinkChange('behance', e.target.value)}
                    placeholder="https://behance.net/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.social_links.instagram}
                    onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/yourusername"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
                <MessageSquare className="h-5 w-5" />
                Contact Form Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook">Contact Form Webhook URL</Label>
                <Input
                  id="webhook"
                  value={formData.contact_form_webhook}
                  onChange={(e) => handleInputChange('contact_form_webhook', e.target.value)}
                  placeholder="https://your-webhook-url.com/contact"
                />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  URL to receive contact form submissions (e.g., Formspree, Netlify Forms)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoReply"
                  checked={formData.auto_reply_enabled}
                  onCheckedChange={(checked) => handleInputChange('auto_reply_enabled', checked)}
                />
                <Label htmlFor="autoReply">Enable Auto-Reply</Label>
              </div>

              {formData.auto_reply_enabled && (
                <div className="space-y-2">
                  <Label htmlFor="autoReplyMessage">Auto-Reply Message</Label>
                  <Textarea
                    id="autoReplyMessage"
                    value={formData.auto_reply_message}
                    onChange={(e) => handleInputChange('auto_reply_message', e.target.value)}
                    placeholder="Thank you for your message! I'll get back to you soon."
                    rows={4}
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Message to automatically send when someone submits the contact form
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}