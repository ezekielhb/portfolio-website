export interface ProfileSettings {
  id: string;
  name: string;
  title: string;
  bio: string;
  profile_image: string;
  hero_image?: string;
  location?: string;
  email: string;
  phone?: string;
  website?: string;
  resume?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  skills: string[];
  experience: string;
  availability: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSettings {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  contact_form_webhook?: string;
  auto_reply_enabled: boolean;
  auto_reply_message?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  client_company: string;
  client_image?: string;
  testimonial_text: string;
  rating?: number;
  project_id?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileData {
  name: string;
  title: string;
  bio: string;
  profile_image: string;
  hero_image?: string;
  location?: string;
  email: string;
  phone?: string;
  website?: string;
  resume?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  skills: string[];
  experience: string;
  availability: string;
}

export interface CreateContactData {
  email: string;
  phone?: string;
  address?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  contact_form_webhook?: string;
  auto_reply_enabled: boolean;
  auto_reply_message?: string;
}

export interface CreateTestimonialData {
  client_name: string;
  client_title: string;
  client_company: string;
  client_image?: string;
  testimonial_text: string;
  rating?: number;
  project_id?: string;
  featured: boolean;
  published: boolean;
}
