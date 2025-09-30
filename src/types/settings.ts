export interface ProfileSettings {
  id: string;
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  heroImage?: string;
  location?: string;
  email: string;
  phone?: string;
  website?: string;
  resume?: string;
  socialLinks: {
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
  createdAt: string;
  updatedAt: string;
}

export interface ContactSettings {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  contactFormWebhook?: string;
  autoReplyEnabled: boolean;
  autoReplyMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientImage?: string;
  testimonialText: string;
  rating?: number;
  projectId?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileData {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  heroImage?: string;
  location?: string;
  email: string;
  phone?: string;
  website?: string;
  resume?: string;
  socialLinks: {
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
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  contactFormWebhook?: string;
  autoReplyEnabled: boolean;
  autoReplyMessage?: string;
}

export interface CreateTestimonialData {
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientImage?: string;
  testimonialText: string;
  rating?: number;
  projectId?: string;
  featured: boolean;
  published: boolean;
}