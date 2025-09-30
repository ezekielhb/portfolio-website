import { supabase } from '@/lib/supabase';
import type { 
  ProfileSettings, 
  ContactSettings, 
  Testimonial, 
  CreateProfileData, 
  CreateContactData, 
  CreateTestimonialData 
} from '@/types/settings';

// Table names
const PROFILE_TABLE = 'profile_settings';
const CONTACT_TABLE = 'contact_settings';
const TESTIMONIALS_TABLE = 'testimonials';

export class SettingsService {
  // Profile Settings
  static async getProfile(): Promise<ProfileSettings | null> {
    const { data, error } = await supabase
      .from(PROFILE_TABLE)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No profile found
      }
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }

    return data;
  }

  static async createProfile(profileData: CreateProfileData): Promise<ProfileSettings> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const profile = {
      id,
      ...profileData,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from(PROFILE_TABLE)
      .insert(profile)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    return data;
  }

  static async updateProfile(profileData: Partial<CreateProfileData>): Promise<ProfileSettings> {
    const updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from(PROFILE_TABLE)
      .update({ ...profileData, updated_at })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    return data;
  }

  // Contact Settings
  static async getContactSettings(): Promise<ContactSettings | null> {
    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch contact settings: ${error.message}`);
    }

    return data;
  }

  static async createContactSettings(contactData: CreateContactData): Promise<ContactSettings> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const contact = {
      id,
      ...contactData,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .insert(contact)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create contact settings: ${error.message}`);
    }

    return data;
  }

  static async updateContactSettings(contactData: Partial<CreateContactData>): Promise<ContactSettings> {
    const updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from(CONTACT_TABLE)
      .update({ ...contactData, updated_at })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update contact settings: ${error.message}`);
    }

    return data;
  }

  // Testimonials
  static async getTestimonials(includeUnpublished: boolean = false): Promise<Testimonial[]> {
    let query = supabase
      .from(TESTIMONIALS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeUnpublished) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch testimonials: ${error.message}`);
    }

    return data || [];
  }

  static async getFeaturedTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch featured testimonials: ${error.message}`);
    }

    return data || [];
  }

  static async getTestimonialById(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch testimonial: ${error.message}`);
    }

    return data;
  }

  static async createTestimonial(testimonialData: CreateTestimonialData): Promise<Testimonial> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const testimonial = {
      id,
      ...testimonialData,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .insert(testimonial)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create testimonial: ${error.message}`);
    }

    return data;
  }

  static async updateTestimonial(id: string, testimonialData: Partial<CreateTestimonialData>): Promise<Testimonial> {
    const updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .update({ ...testimonialData, updated_at })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update testimonial: ${error.message}`);
    }

    return data;
  }

  static async deleteTestimonial(id: string): Promise<void> {
    const { error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete testimonial: ${error.message}`);
    }
  }

  static async toggleTestimonialFeatured(id: string): Promise<Testimonial> {
    const testimonial = await this.getTestimonialById(id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }

    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .update({ 
        featured: !testimonial.featured,
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

  static async toggleTestimonialPublished(id: string): Promise<Testimonial> {
    const testimonial = await this.getTestimonialById(id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }

    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .update({ 
        published: !testimonial.published,
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